import { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../../state'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


import Id from '../Feed/Id/Id'

const Block = (params) => {
  const dispatch = useDispatch()

  const more_amount = 10

  const data = useSelector((state) => state.topShow)
  // console.log(data);

  const inicial = useRef(true)

  const handle = {
    showMore: async () => {
      actionCreators.topShow.clear(params.what)(dispatch)

      const temp = await actionCreators.topShow.add(params.what, more_amount)
      temp(dispatch)
    }
  }
  
  // fetching data
  useEffect(() => {
    const run = async () => {
      const temp = await actionCreators.topShow.add(params.what, 3)
      temp(dispatch)
    }

    if (inicial.current) {
      inicial.current = false
    } else {
      run()
    }

    return () => {
      // cleanup
      actionCreators.topShow.clear(params.what)(dispatch)
    }

  }, [])

  if (!data) return null;

  return (
    <div className='topshow-block-cont shadow'>
      <div className='topshow-block-title'>
        <h1 className='border-line'>Top {params.what}</h1>
      </div>

      <div className='topshow-block-body'>
        {data[params.what].map((e, i) => {
            return (
            <div style={{justifyContent: 'inherit'}} className='topshow-block-user border-line flex'>
              <div className='topshow-block-user-enumeration'>
                {/* <p> */}
                  {i+1}
                {/* </p> */}
              </div>

              <div className='line-vertical topshow-block-line-vertical'></div>

              <div className='topshow-block-id-cont'>
                <Id _id={e._id} belowText={e.postsCount} full={true}/>
              </div>

            </div>
            )
        })}

        <div className='more-slide-down box trasition' onClick={handle.showMore}>
          <FontAwesomeIcon className='fa-icon' icon={faArrowDown}/>
        </div>
      </div>
    </div>
  )
}

export default Block