import { React, useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state'

import TextEditor from '../../TextEditor/SunEditor/TextEditor'

import Id from '../Id/Id'
import MoneySlider from './MoneySlider/MoneySlider'

import './addQuestion.scss'

const AddQuestion = () => {
  const dispatch = useDispatch();

  const skip_till = 9;

  const amountContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  const [inputData, setInputData] = useState('')
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderOpacity, setSliderOpacity] = useState(0);
  const [showInput, setShowInput] = useState(false);
  // const [showMoneySlider, setShowMoneySlider] = useState(false)

  const profile = useSelector((state) => state.auth.authData)

  const post = async () => {
    const temp = await actionCreators.post.create({
      question: inputData,
      amount: sliderValue,
      _id: profile._id,
    })
    dispatch(temp)
  }

  const sliderInputConditions = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '' || parseInt(e.target.value) === 0) {
        toggleSliderInput(true, false)
        setSliderValue(0)
        return
      }

      if (/^(?!-?\d+$)[\s\S]*$/.test(e.target.value)) {
        alert('Amount was not Valid')
        toggleSliderInput(true, false)
        return
      }
      
      if (e.target.value < skip_till) {
        alert(`Minimum amount is ₹${skip_till+1}`)
        toggleSliderInput(true, false)
        setSliderValue(skip_till+1)
        return
      }

      toggleSliderInput()

      setSliderValue(e.target.value)
    }
  }

  const toggleSliderInput = (to_show=false, to_input=false) => {
    let input = document.getElementById('amount-input-!slider')
    let show = document.getElementById('amount-show')
    
    if (!(to_show || to_input)) { // default condition for toggle in both direction
      input.classList.toggle('d-none')
      show.classList.toggle('d-none')
    } else if (to_show) {
      input.classList.add('d-none')
      show.classList.remove('d-none')

      setShowInput(false) // to know when input is hidden for useEffect with dependency of sliderOpacity
    } else {
      input.classList.remove('d-none')
      show.classList.add('d-none')

      setShowInput(true)

      setSliderOpacity(0) // to hide slider when input is shown
    }
  }

  // to toggle slider input when clicked outside of it (from Search.js, go there for more info)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((amountContainerRef.current) && 
        (!amountContainerRef.current.contains(event.target))) {
        toggleSliderInput(true, false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // for updating slider opacity
  useEffect(() => {
    if (!showInput) {
      document.getElementById('money-slider').style.opacity = sliderOpacity;
    } else {
      document.getElementById('money-slider').style.opacity = 0;
    }
  }, [sliderOpacity])

  if (!profile) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <div className='feed-block'>
      <div className="feed-head flex">
        <div className="feed-head-id">
          <Id _id={profile._id} source={profile.source} full={true}/>
        </div>

        <MoneySlider value={sliderValue} setValue={setSliderValue} skip_till={skip_till} opacity={sliderOpacity} setOpacity={setSliderOpacity}/>

        <div className='feed-head-options flex'>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <div className="small-box question-details-child"
              onMouseEnter={() => {
                // document.getElementById('money-slider').style.opacity = 1;
                setSliderOpacity((prev) => { return prev+1}); // so a change in opacity is detected in useEffect of MoneySlider
              }}
              >
                <div className='pin-cont'
                ref={amountContainerRef}
                onClick={(e) => {
                  // for toggle when enter in input not clicked
                  if (e.target.id !== 'amount-input-!slider-child') {
                    toggleSliderInput(false, true)
                  }


                  // if (!input.classList.contains('d-none')) {
                  //   console.log('run');
                  //   input.focus();mckdnlnckknn
                  // }
                }}
                >
                  <p id='amount-show'>{(() => {
                    if (sliderValue === 0) {
                      return 'Free'
                    } else {
                      return `₹${sliderValue}`
                    }
                  })()}</p>
                  <div id='amount-input-!slider' className='overlay-input d-none'>
                    <input
                    id='amount-input-!slider-child'
                    placeholder='Enter Amount'
                    onKeyDown={sliderInputConditions}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <FontAwesomeIcon className='fa-icon' icon={faExpand} />
            </div>
          </div>
          <div className='feed-head-options-child'>
            <div className="more box">
              <FontAwesomeIcon className='fa-icon' icon={faEllipsis} />
            </div>
          </div>
        </div>
      </div>

      <div ref={textContainerRef} className='text-and-btn-wrapper'>
        <TextEditor
        ref={textContainerControlRef}
        parentRef={textContainerRef}

        placeholder="Your Question?"
        change={(data) => {setInputData(data)}}
        />
        <div
        onClick={() => {
          post()
          textContainerControlRef.current.setContents('');
          textContainerControlRef.current.offToolbar();
        }}
        className='feed-more'>
          <p>POST</p>
        </div>
      </div>

    </div>
  )
}

export default AddQuestion