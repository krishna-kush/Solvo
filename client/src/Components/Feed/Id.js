import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { actionCreators } from '../../state/index'

const Id = (params) => {
  const dispatch = useDispatch()

  let creator = useSelector((state) => {return state.ids[params._id]})
  // console.log(creator);

  let upId = async () => {
    if (!creator) {
      let temp = await actionCreators.auth.whoAdd(params._id, params.source);
      temp(dispatch)
    }
  }
  upId()

  if (!creator) {
    return (
      <div>Lodddding...</div>
    )
  }

  return (
    <div className="id">
      {/* <div className="id-img circle"> */}
      <div>
        <img className="id-img circle" src={creator.photo} />
      </div>
      <div className="id-details">
        <div className="id-details-top">
          <div className="name">{creator.name}</div>
          <div className="dot">
            <div className="dot-inner">·</div>
          </div>
          {params.full?(
            <div className="follow">Follow</div>
          ):(
            <div className="id-date">
            5 may 2019
            </div>
          )
          }
        </div>
        {params.full?(
          <div className="id-bottom">
            <div className="id-date">
            5 may 2019
            </div>
          </div>
        ):(
          <></>
        )}
      </div>
    </div>
  )
}

export default Id