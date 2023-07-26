import { React, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { actionCreators } from '../../state'
import { useQuery } from '../../Utils/Universal'

import FeedBlocks from './FeedBlocks'
import AddQuestion from './AddQuestion'

const initializeFeed = async (searchQuery, skip, limit, dispatch) => {
  const search = searchQuery.trim()
  if (search) {
    const temp = await actionCreators.post.getBySearch(search)
    temp(dispatch)
    return 
  }
  // const temp = await actionCreators.post.getAll()

  // let temp;
  for (let i=0; i<limit; i++) {
    let temp = await actionCreators.post.getEnumerated(skip+i, 1, i===limit-1?true:false)
    temp(dispatch)
  }
}

export default () => {
  console.log('FEED');

  const dispatch = useDispatch();
  const query = useQuery(useLocation); // this will work like a hook, so whenever it changes react will re-render the component, so we don't need to put it on useEffect

  const useEffectRef = useRef(false)

  const searchQuery = query.get('searchQuery') || '';
  
  let feed_blocks_len = useSelector((state) => state.post.length);
  let feed_blocks = []
  for (let i = 0; i < feed_blocks_len; i++) {
    feed_blocks.push(i)
  }
  
  
  // using second render of useEffect to initialize the feed
  useEffect(() => {
    /*
    LINK: https://react.dev/blog/2022/03/08/react-18-upgrade-guide

    In the future, we’d like to add a feature that allows React to add and remove sections of the UI while preserving state. For example, when a user tabs away from a screen and back, React should be able to immediately show the previous screen. To do this, React would unmount and remount trees using the same component state as before.
 
    To help surface these issues, React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.

    */

    if (useEffectRef.current) {
      // console.log('initializeFeed');
      initializeFeed(searchQuery, 0, 3, dispatch)
    }

    return () => {
      // console.log('unmount');
      useEffectRef.current = true
    }
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