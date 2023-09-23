import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './dropdown.scss'

const DropdownUni = forwardRef((params, ref) => {
  /*
  This Dropdown Component will take a ref, that'll be to store the state of the dropdown, so that it can be accessed and changed from outside of this component.

  Other Attributes:
  options: array of options,

  btnRef: ref of the button that'll be clicked to open the dropdown, if want to change the default position setting, which is at with start of btn dropdown will start, (not nessesry if want to let it defalut),
  position: left or right, default is right (not nessesry if want to let it defalut),

  onChange: function that'll be called when any option is clicked,
  onSelect: array of functions that'll be called when specific option is clicked, it'll be passed the index of the option clicked,
  */

  /*
  Why to have all the functions of dropdown in parent function?
  => Because it'll not be efficient to have all the definations of different dropdown options from different places in one dropdown file, and making multiple dropdown will not make sense. So Dropdown is Universal now, with name of options and their function comming from parent comoponent.

  Explaining Structure:
  =>
  Limitation: Their can be Some option field that can have multiple option names defined for single field and they are meant to toggle between those names and functions defined for them.
  So one solution can be to use UseState and make reactive variables for such field and send them in dropdown component, and whenever needed change them from parent component but it'll make the parent component re-render which is unnessery. Then we can have the reactive variables in dropdown itself, but it then makes it hard to let the dropdown component universal, for which we started all this change.

  Solution: Make one reactive variable in dropdown named extras and access it from ref of useImperativeHandle, when ever needed to put a extra information and render the dropdown just change that variable only.
  */

  
  const componentRef = useRef(null);
  
  const [restart, setRestart] = useState(0)
  const [show, setShow] = useState(false)
  
  const [extras, setExtras] = useState({})
 
  useImperativeHandle(ref, () => ({
    show: show,
    setShow: (val) => {setShow(val)},

    restart: () => {setRestart(prev => prev+1)},

    extras: extras,
    pushExtras: (val) => setExtras(prev => {return {...prev, ...val}}),
  }));
  
  // to position dropdown
  useEffect(() => {
    // Middle of the button
    // ref.current.style.transform = `translateX(-50%) translateX(${referenceWidth / 2}px)`; // 50% of the dropdown width and 50% of the button width

    // Left of the button
    if (componentRef.current && params.position === 'left') {
      const referenceWidth = params.btnRef.current.getBoundingClientRect().width; // width of the button
      componentRef.current.style.transform = `translateX(-100%) translateX(${referenceWidth}px)` // 50% of the dropdown width and 50% of the button width
    }

  })

  // to toggle dropdown when clicked outside of it (from Search.js, go there for more info)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((componentRef.current) && 
        (!componentRef.current.contains(event.target)) &&
        (event.target.closest(`#dropdown${params.id}`) === null)) {
        setShow(false)
      }
    };

    if (componentRef.current) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (componentRef.current) document.removeEventListener('mousedown', handleClickOutside);
    };
  });


  if (!show) return null; // Why isn't this 'return null' is placed above in code, to prevent unnessesary rendering, because we have to render all the hooks everytime, whether we use it or not, it's as react works, at it's core, if not then component will fall in re-render loop

  return (
    <div ref={componentRef} className='dropdown shadow transition'>
      <ul>
        {params?.options!==undefined? params.options.map((option, index) => {
          return (
            <li key={index} className='transition' onClick={() => {
              params.onChange(index)
              params.onSelect[index]()
              
              setShow(false)
            }}>
              {
                typeof option?.optionName === 'object'
                ? ref.current.extras !== undefined
                  ? ref.current.extras[option.id] !== undefined

                    ? option.optionName[ref.current.extras[option.id]]
                    : option.optionName[option.optionCondition.what_to_show]
                  : option.optionName[option.optionCondition.what_to_show]

                : option
              }
            </li>
          )
        }): <li>No Available Options</li>
        }
      </ul>
    </div>
  )
})

export default DropdownUni