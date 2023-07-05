import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state'

import SearchBlocks from './SearchBlocks'
import SearchInput from './SearchInput'


const Search = () => {
  const dispatch = useDispatch()

  const searchBlocks_elements = ['Questions', 'Topics', 'Channels']

  const input = useSelector((state) => state.searchInput)
  const searched = useSelector((state) => state.searched)
  const setInput = (input) => {dispatch(actionCreators.search.updateSearchInput(input))}

  
  let triggerEnterKeyEvent = (element_id) => { // Function to trigger "Enter" key press event
    const inputElement = document.getElementById(element_id);
    const enterKeyEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    });

    inputElement.dispatchEvent(enterKeyEvent);
  }

  
  return (
    <div id="header-search">
      <div id='search-container'>
        <div className='search-icon'>
          <FontAwesomeIcon className='icon-inside-search' icon={faSearch} />
        </div>

        <SearchInput/>


        {input? (
        <div className='search-cancle'
        onClick={()=>{
          setInput('')
          document.getElementById('search-input').value = ''
        }}>
          <FontAwesomeIcon className='icon-inside-search' icon={faXmarkCircle} />
        </div>
        ) : ( <></> )}

      </div>
      
      {(input && !searched)? (
      <div id='searchblocks-container'>
        {searchBlocks_elements.map((element, index) => {
          return <SearchBlocks element={element} input={input}/>
        })}
        <div className='searchblock dark-hover'
        onClick={() => {triggerEnterKeyEvent('search-input')}}>Search For {input}</div>
      </div>
      ) : (<></>)}

    </div>
  )
}

export default Search