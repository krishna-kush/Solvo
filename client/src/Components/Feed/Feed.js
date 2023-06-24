import { React, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import FeedBlocks from './FeedBlocks'
import AddQuestion from './AddQuestion'
import { actionCreators } from '../../state'

export default () => {
  const dispatch = useDispatch();

  let feed_blocks_len = useSelector((state) => state.post.length);
  let feed_blocks = []
  for (let i = 0; i < feed_blocks_len; i++) {
    feed_blocks.push(i)
  }

  
  let temp = async () => {
    let profile = JSON.parse(localStorage.getItem('profile'))
    let temp = await actionCreators.post.getAll(profile.source)
    temp(dispatch)
  }
  
  useEffect(() => {
    temp()
  }, [])
  
  // if (!feed_blocks_len) {
  //   return (
  //     <div>Loding...</div>
  //   )
  // }
    
  return (
    <div id="feed">

      <div className="ad-ques-cont">
        <AddQuestion/>
      </div>

      <div className="feed-blocks-cont">
        {feed_blocks.map((id) => {
          return <FeedBlocks id={id}/>
        })}
      </div>
    </div>
  )
}