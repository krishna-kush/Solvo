import React, { useState, useEffect, useRef} from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import { actionCreators } from '../../../state'

const SearchInput = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const delay = 10000;
  const placeholder_list = [
    ['Search for a Question...', 'Search "How to make rockets"'], ['Search inside a Channel', 'Search "NASA/Martian Home Bounty"'],
  ]

  const input = useSelector((state) => state.searchInput)
  const setInput = (input) => {dispatch(actionCreators.search.updateSearchInput(input))}
  const searched = useSelector((state) => state.searched)
  const setSearched = (searched) => {dispatch(actionCreators.search.updateSearched(searched))}

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
      setSearched(true) // to not render search blocks
    }
  }
  
  // To Update placeholder text
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

  // To Update style of search container when input changes
  useEffect(() => {
    let searchCont = document.getElementById('search-container')
    const search_curve_width = getComputedStyle(document.documentElement).getPropertyValue('--search-curve-width')
    if (input && !searched) {
      searchCont.style.borderRadius = `${search_curve_width} ${search_curve_width} 0 0`
    } else {
      searchCont.style.borderRadius = search_curve_width
    }
  } , [input, searched])

  return (
    <input id='search-input' type="text" placeholder={placeholderText}
    onChange={(e) => {
      setInput(e.target.value)
      setSearched(false)
    }}
    onClick={() => {setSearched(false)}}
    onKeyDown={handleKeyPress}
    required
    ></input>
  )
}

export default SearchInput