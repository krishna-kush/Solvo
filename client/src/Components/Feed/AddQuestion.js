import { React, useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { actionCreators } from '../../state'

import TextEditor from '../TextEditor/TextEditor'

import Id from './Id'

const AddQuestion = () => {
  const dispatch = useDispatch();

  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  let [inputData, setInputData] = useState('')

  let profile = useSelector((state) => state.auth.authData)

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
      <Id _id={profile._id} source={profile.source} full={true}/>

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