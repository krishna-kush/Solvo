import { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../../state'

import Id from '../Feed/Id/Id'

const Block = () => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.topShow)
  // console.log(data);

  const inicial = useRef(true)
  
  // fetching data
  useEffect(() => {
    const run = async () => {
      const temp = await actionCreators.topShow.add('question', 3)
      temp(dispatch)
    }

    if (inicial.current) {
      inicial.current = false
    } else {
      run()
    }

    return () => {
      // cleanup
      actionCreators.topShow.clear()(dispatch)
    }

  }, [])

  if (!data) return null;

  return (
    <div id='topshow-block-cont' className='shadow'>
      <div id='topshow-block-title' className=''>
        <h1>Top Answerers</h1>
      </div>

      <div id='topshow-block-body'>
        {data.map((e, i) => {
            return (
            <div style={{justifyContent: 'inherit'}} className='topshow-block-user flex'>
              <div style={{justifyContent: 'space-around'}} className='topshow-block-user-enumeration circle'>
                <p>
                  {i+1}
                </p>
              </div>
              <Id _id={e._id} belowText={e.postsCount} full={true}/>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default Block