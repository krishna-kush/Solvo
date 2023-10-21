import { React, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { actionCreators } from '../../state'
import { useQuery } from '../../Utils/Universal'

import FeedBlocks from './FeedBlocks'
import AddQuestion from './AddQuestion/AddQuestion'
import Changer from './Changer/Changer'

import './feed.css'

import Axios from '../../API/AxiosInstance'
import useAxios from '../../Hooks/useAxios'

const initializeFeed = async ([is_following, following_id], searchQuery, skip, limit, dispatch) => {
  const search = searchQuery.trim()
  if (search) {
    const temp = await actionCreators.post.getBySearch(search)
    temp(dispatch)
    return 
  }
  // // const temp = await actionCreators.post.getAll()

  // let temp;
  // for (let i=0; i<limit; i++) {
  //   let temp = await actionCreators.post.getEnumerated(skip+i, 1, i===limit-1?true:false)
  //   temp(dispatch)
  // }
  // --------------------------------------------------------------------
  // for (let i=0; i<limit; i++) {
    // const [data, error, loading, refetch] = useAxios({
    //   axiosInstance: Axios,
    //   method: 'POST',
    //   url: '/posts/getEnumerated',
    //   requestConfig: {
    //     headers: {
    //       'Content-Language': 'en-US',
    //       //'Accept': 'text/html'
    //     },
    //     data: {
    //       skip: skip, 
    //       limit: 1
    //     }
    //   }
    // });

    // console.log(data);
  // }
}

const wsInitializeFeed = async ([is_following, following_id], _id, searchQuery, skip, limit, socket, dispatch) => {
  const search = searchQuery.trim()
  if (search) {
    const temp = await actionCreators.post.getBySearch(search)
    temp(dispatch)
    return 
  }

  socket.onopen = () => {
    console.log('WebSocket connection established.');
    // The socket.send() method expects a string or a buffer as its parameter, not a JavaScript object. So, we need to convert the object to a string using JSON.stringify().
    for (let i=0; i<limit; i++) {
      socket.send(JSON.stringify({ _id: _id, is_following: is_following, following_id: following_id, skip: skip+i, limit: 1, if_last: i===limit-1?true:false }));
    }
    // socket.send(JSON.stringify({ is_following: is_following, following_id: following_id, skip: skip, limit: 5, if_last: false }));
  };

  socket.onmessage = async (event) => {
    // console.log(JSON.parse(event.data));
    let temp = await actionCreators.post.wsGetEnumerated(JSON.parse(event.data))
    temp(dispatch)
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed. FRONTEND');
  }

  return socket
}

export default (params) => {
  console.log('FEED');

  const dispatch = useDispatch();
  const query = useQuery(useLocation); // this will work like a hook, so whenever it changes react will re-render the component, so we don't need to put it on useEffect

  const useEffectRef = useRef(false)

  const searchQuery = query.get('searchQuery') || '';

  const changer = useSelector((state) => state.changer);
  const changer_true = (() => {
    for (let i of changer) {
      if (i[1] === true) {return i[0]}
    }
  })()
  // console.log(changer_true);

  let profile;
  useSelector((state) => {
    profile = state.auth.authData
  }); // This way the component won't re-render even when authData changes from any other component or this component, with this method the profile variable will not be add to dependency of this component because this is not the right way to use useSelector...
  // console.log(profile);

  const feed_blocks_len = useSelector((state) => state.post.length);
  let feed_blocks = []
  for (let i = 0; i < feed_blocks_len; i++) {
    feed_blocks.push(i)
  }

  // initializeFeed(searchQuery, 0, 3, dispatch)
  
  // using second render of useEffect to initialize the feed
  useEffect(() => {
    /*
    LINK: https://react.dev/blog/2022/03/08/react-18-upgrade-guide

    In the future, we’d like to add a feature that allows React to add and remove sections of the UI while preserving state. For example, when a user tabs away from a screen and back, React should be able to immediately show the previous screen. To do this, React would unmount and remount trees using the same component state as before.
 
    To help surface these issues, React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.

    */

    let socket;

    if (params.production || useEffectRef.current) {
      socket = new WebSocket(`${parseInt(process.env.REACT_APP_PRODUCTION)?'wss':'ws'}://${process.env.REACT_APP_BASE_URL || 'localhost:5000'}/posts/websocket`);
      // wsInitializeFeed((() => {
      wsInitializeFeed((() => {
        if (changer_true==='Explore') return [null, null]
        else if (changer_true==='Feed') return [true, profile.following._id]
        else if (changer_true==='My Activity') return [false, profile._id]
        else return []
      })() , profile._id, searchQuery, 0, 5, socket, dispatch)
    }
    
    return () => {
      console.log('unmount');
      useEffectRef.current = true

      if (socket) {
        socket.close()

        // to delete post elements from UI
        dispatch({
          type: 'SET_POST',
          payload: []
        })
      }
    }
  }, [changer, searchQuery])
  
  // if (!feed_blocks_len) {
  //   return (
  //     <div>Loding...</div>
  //   )
  // }
    
  return (
    <div className='left-panel-cont'>
      <div id="feed" className='scroll'>
        <div className="ad-ques-cont">
          <AddQuestion/>
        </div>

        <div className="feed-blocks-cont">
          {feed_blocks.map((id) => {
            return <FeedBlocks id={id}/>
          })}
        </div>

      </div>

      <Changer/>
    
    </div>
  )
}