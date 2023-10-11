import React from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { actionCreators } from '../../../state/index'

import TimeDifference from '../../TimeDifference'

import './id.css'

const Id = (params) => {
  /*
  *_id = id of the user
  *source = source of the user
  createdAt = time of creation of the post
  full = if true, then show the follow button
  size = size of the image
  */

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.auth.authData);
  const creator = useSelector((state) => {return state.ids[params._id]})
  // console.log(profile, creator, params._id);

  const upId = async () => {
    if (!creator) {
      const temp = await actionCreators.auth.whoIdAdd(params._id);
      temp(dispatch)
    }
  }
  upId()

  const handleFollow = async (follow) => {
    let temp;

    if (follow) {
      temp = await actionCreators.follow.follow(profile._id, profile.following._id, creator._id, params.source)
    } else {
      temp = await actionCreators.follow.unFollow(profile._id, profile.following._id, creator._id, params.source)
    }

    if (typeof temp !== 'number') {
      temp(dispatch)
    } else {console.log(temp)}    
  }

  const getSize = () => {
    if (params.size) {
      return {
        width: params.size,
        height: params.size,
      }
    } else return {}
  }

  if (!creator) {
    return (
      <div>Lodddding...</div>
    )
  }

  return (
    <div className="id flex">
      {/* <div className="id-img circle"> */}
      <div>
        <img style={getSize()} className="id-img circle" src={creator.photo} />
      </div>
      <div className="id-details">
        <div className="id-details-top">
          <Link to={`/${creator._id}`} className="name hover-text">{creator.name}</Link>

          { // for adding · to every Id exept condition
          params.full && profile._id === creator._id
          ?
            <></>
          : <div className="dot">
              <div className="dot-inner">·</div>
            </div>
          }

          {
          params.full
          ?
            profile._id !== creator._id
            ? profile.following.ids.includes(creator._id)
              ?
                <div className="follow hover-text"
                onClick={() => {
                  handleFollow(false)
                }}>Following</div>
              :
                <div className="follow hover-text"
                onClick={() => {
                  handleFollow(true)
                }}>Follow</div>
            : <></>
          :
            params.createdAt
            ? 
              <div className="id-date">
              <TimeDifference savedTime={params.createdAt} />
              </div>
            : <></>
          }
        </div>

        {params.full && params.createdAt ? (
          <div className="id-bottom">
            <div className="id-date">
            <TimeDifference savedTime={params.createdAt} />
            </div>
          </div>
        ): null}
        {params.full && params.belowText ? (
          <div className="topshow-count">
            <p>
              {params.belowText}
            </p>
          </div>
        ): null}
      </div>
    </div>
  )
}

export default Id