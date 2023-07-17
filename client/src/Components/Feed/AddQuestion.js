import { React, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { actionCreators } from '../../state'

import Id from './Id'

const AddQuestion = () => {
  const dispatch = useDispatch();

  let [data, setData] = useState('')

  let profile = useSelector((state) => state.auth.authData)

  let post = async () => {
    const temp = await actionCreators.post.create({
      question: data,
      _id: profile._id,
      source: profile.source,
    })
    dispatch(temp)
  }

  let textChange = (e) => {
    // let name = e.target.name
    let value = e.target.value

    setData(value)

    // changeData(name, 'value', value)
  }

  if (!profile) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <div className='feed-block'>
      <div className='feed-top'>
        <Id _id={profile._id} source={profile.source} full={true}/>

        <input
        onChange={textChange}
        className="user-answer" type="text" placeholder="Your Question?"/>
      </div>


      <div
      onClick={post}
      className='feed-more'>
        <p>POST</p>
      </div>
    </div>
  )
}

export default AddQuestion