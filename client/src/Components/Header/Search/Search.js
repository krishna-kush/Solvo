import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state'

import SearchBlocks from './SearchBlocks'
import SearchInput from './SearchInput'


const Search = () => {
  const dispatch = useDispatch()

  const containerRef = useRef(null);

  const searchBlocks_elements = ['Questions', 'Topics', 'Channels']

  const input = useSelector((state) => state.searchInput)
  const searched = useSelector((state) => state.searched)
  const setSearched = (searched) => {dispatch(actionCreators.search.updateSearched(searched))}
  const setInput = (input) => {dispatch(actionCreators.search.updateSearchInput(input))}

  
  const triggerEnterKeyEvent = (element_id) => { // Function to trigger "Enter" key press event
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

  // to close search blocks when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSearched(true)
      }
    };

    // adding the event directly on document not on it's element because we want to listen to all clicks on the page and one element can only listen to it's own events
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div ref={containerRef} id='searchblocks-container'
      onMouseEnter={() => {
        dispatch({type: 'LOCK_SEARCHED'})
      }}
      onMouseLeave={() => {
        dispatch({type: 'UNLOCK_SEARCHED'})
      }}
      >
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