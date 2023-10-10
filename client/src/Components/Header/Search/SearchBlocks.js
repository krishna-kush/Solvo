import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import { actionCreators } from '../../../state'

import { searchHandler } from '../../../Utils/Search'


const SearchBlocks = (params) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const input = useSelector((state) => state.searchInput)
  const setInput = (input) => {dispatch(actionCreators.search.updateSearchInput(input))}

  const setSearched = (searched) => {dispatch(actionCreators.search.updateSearched(searched))}

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
        if (element === null || element === undefined) return null;
         
        return (
        <div className='searchblock-child box'
        onClick={() => {
          searchHandler(element, navigate)
          document.getElementById('search-input').value = element
          setSearched(true)
        }}
        dangerouslySetInnerHTML={{ __html: element }}>
        </div>
        )
      })}
    </div>
  )
}

export default SearchBlocks