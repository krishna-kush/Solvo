import { React, useState } from 'react'

import { actionCreators } from '../../state'

import Id from './Id'

const AddQuestion = () => {

  let [data, setData] = useState('')

  let textChange = (e) => {
    // let name = e.target.name
    let value = e.target.value

    setData(value)

    // changeData(name, 'value', value)
  }

  let post = () => {
    let profile = JSON.parse(localStorage.getItem('profile'))

    actionCreators.post.create({
      question: data,
      _id: profile._id,
      source: profile.source,
    })

    // setData('') // from dispatch
  }

  return (
    <div className='feed-block'>
      <div className='feed-top'>
        <Id id={0} full={true}/>

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