import { React, useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state'

import MoneySlider from './MoneySlider'
import TextEditor from '../TextEditor/TextEditor'

import Id from './Id'

const AddQuestion = () => {
  const dispatch = useDispatch();

  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  const [inputData, setInputData] = useState('')
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderOpacity, setSliderOpacity] = useState(0);
  // const [showMoneySlider, setShowMoneySlider] = useState(false)

  const profile = useSelector((state) => state.auth.authData)

  const post = async () => {
    const temp = await actionCreators.post.create({
      question: inputData,
      _id: profile._id,
      source: profile.source,
    })
    dispatch(temp)
  }

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

        <MoneySlider value={sliderValue} setValue={setSliderValue} opacity={sliderOpacity}/>

        {/* {showMoneySlider? document.getElementById('money-slider').style.opacity = 1 : null} */}

        <div className='feed-head-options flex'>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <div className="small-box question-details-child"
              onMouseEnter={() => {
                // setShowMoneySlider(true)
                document.getElementById('money-slider').style.opacity = 1;
                setSliderOpacity((prev) => { return prev+1}); // so a change in opacity is detected in useEffect of MoneySlider
              }}
              >
                {(() => {if (sliderValue == 0) {
                    return <p>Free</p>
                  } else {
                    return `₹${sliderValue}`
                  }})()}

                {/* <input /> // when click have option to change amt */}
              </div>
            </div>
          </div>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <FontAwesomeIcon className='fa-icon' icon={faExpand} />
            </div>
          </div>
          <div className='feed-head-options-child'>
            <div className="more">
              <FontAwesomeIcon className='fa-icon' icon={faEllipsis} />
            </div>
          </div>
        </div>
      </div>

      {/* <input
      onChange={textChange}
      className="user-answer" type="text" placeholder="Your Question?"/> */}

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