import { React, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import FeedBlocks from './FeedBlocks'
import AddQuestion from './AddQuestion'
import { actionCreators } from '../../state'

import { useQuery } from '../../Utils/Universal'

export default () => {
  const dispatch = useDispatch();
  const query = useQuery(useLocation); // this will work like a hook, so whenever it changes react will re-render the component, so we don't need to put it on useEffect

  const searchQuery = query.get('searchQuery') || '';
  
  let initializeFeed = async (searchQuery) => {
    const search = searchQuery.trim()
    if (search) {
      let temp = await actionCreators.post.getBySearch(search)
      temp(dispatch)
      return
    }
    let temp = await actionCreators.post.getAll()
    temp(dispatch)
  }
  initializeFeed(searchQuery)
  
  let feed_blocks_len = useSelector((state) => state.post.length);
  let feed_blocks = []
  for (let i = 0; i < feed_blocks_len; i++) {
    feed_blocks.push(i)
  }
  
  
  useEffect(() => {
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