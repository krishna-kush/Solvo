import { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../../state'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


import Id from '../Feed/Id/Id'

const Block = (params) => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.topShow)
  // console.log(data);

  const inicial = useRef(true)

  const handle = {
    showMore: async () => {
      actionCreators.topShow.clear()(dispatch)

      const temp = await actionCreators.topShow.add('question', 5)
      temp(dispatch)
    }
  }
  
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
    <div className='topshow-block-cont shadow'>
      <div className='topshow-block-title'>
        <h1>Top {params.what}</h1>
      </div>

      <div className='topshow-block-body'>
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

        <div className='more-slide-down box trasition' onClick={handle.showMore}>
          <FontAwesomeIcon className='fa-icon' icon={faArrowDown}/>
        </div>
      </div>
    </div>
  )
}

export default Block