import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actionCreators } from '../../../state'

const SearchBlocks = (params) => {
  const dispatch = useDispatch()

  const input = useSelector((state) => state.searchInput)

  // console.log('render SearchBlocks');

  const data = {
    Questions: useSelector((state) => state.search.questions),
    Topics: useSelector((state) => state.search.topics),
    Channels: useSelector((state) => state.search.channels),
  }

  useEffect(() => { // useEffect does not support async function directly so useEffect(async () => { ... }) is not allowed and we need to create a wrapper function for it.

    const dispatchData = async () => {
      const tempFunction = actionCreators.search[`upSearch${params.element}`];
      const temp = await tempFunction(params.input, 2);
      temp(dispatch)
    }

    dispatchData()
  }, [input])
  
  if (!data[params.element].length) {
    return (<></>)
  }

  return (
    <div className='searchblock'> 
      <div className='name'>{params.element}</div>

      {data[params.element].map((element, index) => {
        return (
        <div className='searchblock-child dark-hover'>
          {element}
        </div>
        )
      })}
    </div>
  )
}

export default SearchBlocks