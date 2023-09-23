import { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state'
import { useDispatch } from 'react-redux'

import { toggle } from '../../Utils/Basic'

import './profile.scss'

import Stats from './Stats/Stats'
import DropdownUni from '../Dropdown/Dropdown'
import Content from './Content/Content'



const Profile = () => {
  const dispatch = useDispatch();

  const options = ['Following', 'Followers']

  const dropdownRef = useRef(null)

  const handle = {
    clickMain: () => {
      toggle(dropdownRef.current.show, dropdownRef.current.setShow)
      // console.log(dropdownRef.current);
    },

    onDropdownChange: (to) => {
      actionCreators.profile.changeSelected(to)(dispatch)
    },

    onDropdownSelect: [
      () => {
        // actionCreators.profile.changeSelected(0)(dispatch)
      },
      () => {
        // actionCreators.profile.changeSelected(1)(dispatch)
      },
    ]
  }



  // how to have selected as a dependency?
  // useEffect(() => {
  //   console.log(dropdownRef.current.selected);
  // }, [dropdownRef.current.selected]);

  return (
    <div id='profile-cont' className='left-panel-cont'>
      <Stats/>

      <div id='profile-control' className='flex'>
        <div className='profile-options box' onClick={handle.clickMain}>
          <p style={{display: 'inline', marginRight:'var(--short-margin)'}}>Following</p>

          <FontAwesomeIcon className='fa-icon transition-fast' icon={faCaretDown} />
        </div>
        <div className='profile-goback box transition-fast'>
          <FontAwesomeIcon className='fa-icon transition-fast' icon={faBackward} />
        </div>
      </div>
      <DropdownUni ref={dropdownRef} options={options} onChange={handle.onDropdownChange} onSelect={handle.onDropdownSelect}/>

      <Content/>
    </div>
  )
}

export default Profile