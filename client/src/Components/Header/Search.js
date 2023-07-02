import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
  const navigate = useNavigate()
  
  const delay = 10000;
  
  const placeholder_list = [
    ['Search for a Question...', 'Search "How to make rockets"'], ['Search inside a Channel', 'Search "NASA/Martian Home Bounty"'],
  ]

  let [input, setInput] = useState('')
  let [placeholderIndex, setPlaceholderIndex] = useState([Math.floor(Math.random() * placeholder_list.length), 0])
  let [placeholderText, setPlaceholderText] = useState('')

  let searchHandler = () => {
    const search = input.trim()
    if (search) {
      navigate(`/feed?searchQuery=${search}`) // navigate is a async function...
    } else {
      navigate('/')
    }
  }

  let handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchHandler()
    }
  }

  useEffect(() => {
    let letter_delay = 100;

    let currentIndex = 0;
    let currentText = '';

    let updateIndex = (delay, where) => {
      // setTimeout(() => {
        setPlaceholderText('');
        setPlaceholderIndex([where[0], where[1]]);
      // }, delay);
    }

    let resetPlaceholderText = () => {
      let currentIndex = currentText.length;

        const interval = setInterval(() => {
          if (currentIndex > 0) {
            currentText = currentText.slice(0, currentIndex - 1);
            setPlaceholderText(currentText);
            currentIndex--;
          } else {
            clearInterval(interval);
            if (placeholderIndex[1] == 0) {
              updateIndex(delay, [placeholderIndex[0], 1])
            } else {
              updateIndex(delay, [Math.floor(Math.random() * placeholder_list.length), 0])
            }
          }
        }, letter_delay);
    }

    const interval = setInterval(() => {

      if (currentIndex < placeholder_list[placeholderIndex[0]][placeholderIndex[1]].length) {
        currentText += placeholder_list[placeholderIndex[0]][placeholderIndex[1]][currentIndex];
        setPlaceholderText(currentText);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          resetPlaceholderText()
        }, delay);
      }
    }, letter_delay);

    return () => { // cleanup function, it'll be executed when the component unmount, means it'll be run when the effect is about to run again (before the component re-renders). It's a feature of useEffect.
    };
  }, [placeholderIndex]);


  return (
    <div id="header-search">
      <div className='search-container'>
        <div className='search-icon'>
          <FontAwesomeIcon className='icon-inside-search' icon={faSearch} />
        </div>

        <input type="text" placeholder={placeholderText}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        ></input>

        <div className='search-cancle'>
          <FontAwesomeIcon className='icon-inside-search' icon={faXmarkCircle} />
        </div>

    </div>
    </div>
  )
}

export default Search