// Not Copied

import { useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'

import './index.scss'

const index = (params) => {

  const cont = useRef(null)
  const button = useRef(null)
  const line1 = useRef(null)
  const line2 = useRef(null)
  

  const toggle = useSelector((state) => {
    let currentState = state;
    for (let i = 0; i < params.state.length; i++) {
      currentState = currentState[params.state[i]];
    }
    return currentState;
  });

  // sett the left of btn to the left or right of cont
  const setBtnleft = (margin) => {
    if (toggle) {
      const contWidth = cont.current.offsetWidth
      const buttonWidth = button.current.offsetWidth

      if (margin === undefined) margin = window.getComputedStyle(button.current).marginLeft;
        
      button.current.style.left = `${contWidth - buttonWidth - parseFloat(margin)*2}px`;
    } else {
      button.current.style.left = 0;
    }
  }
    
  // const handle = {
  //   onClick: () => {
      
  //   }
  // }

  // setting button in place, with equal top and margin
  useEffect(() => {
    const height = cont.current.offsetHeight
    
    const buttonHeight = 80

    const dist = ( (100 - buttonHeight) / 2 / 100 ) * height

    button.current.style.height = `${buttonHeight}%`;
    button.current.style.margin = `0px ${dist}px`
    // button.current.style.top = `${dist}px` // setted with flexbox for now, because it's changing after the css loads, so it's having a transition, that I don't want, offcourse I can just remove the transition from it, but for now it'll do

    setBtnleft(dist)
  }, [params.show])

  useEffect(() => {
    setBtnleft()
  }, [toggle])

  const setClass = (condition, className) => {
    if (condition) return className;
    return ''
  }

  return (
    <div ref={cont} 
    style={{width: params.width, height: params.height, borderRadius: `calc(${params.height})`}} 
    className='tick-cont'

    onClick={()=>{params.onClick(toggle)}}
    >
      <div ref={button} className={`tick-button circle ${setClass(toggle, 'toggle-on')}`}>
        <div className='tick-button-sign'>
          <div ref={line1} className={`tick-button-line1 ${setClass(toggle, 'tick-button-line1-on')}`}>
          </div>
          <div ref={line2} className={`tick-button-line2 ${setClass(toggle, 'tick-button-line2-on')}`}>
        </div>
        </div>
      </div>
    </div>
  )
}

export default index