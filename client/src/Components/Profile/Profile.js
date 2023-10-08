import { useState, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { whoProfile } from '../../API/auth'

import { toggle } from '../../Utils/Basic'

import './profile.scss'

import Stats from './Stats/Stats'
import DropdownUni from '../Dropdown/Dropdown'
import Content from './Content/Content'



const Profile = () => {
  const { profileId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = ['Following', 'Followers']

  const [data, setData] = useState(false)
  const [FollowText, setFollowText] = useState(options[0])

  const dropdownRef = useRef(null)

  const handle = {
    clickMain: () => {
      toggle(dropdownRef.current.show, dropdownRef.current.setShow)
      // console.log(dropdownRef.current);
    },
    goBack: () => {
      navigate(-1)
    },

    onDropdownChange: (to) => {
      setFollowText(options[to])
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


  useEffect(() => {
    const getStat = async (_id) => {
      console.log(_id);
      const who = await whoProfile(_id)
      console.log(who);
      setData(who)

    // const { following, followers, ...rest } = data
    }
    getStat(profileId)

    return () => {
      console.log('Profile Un');
    }
  }, [profileId]) // without having profileId as a dependency, when we change the url and try to re-render the component, the component will run again, but only like when a reactive variable change, only Html and the code that is not inside a hook will render again, not useEffect. And neither do the useEffect will get unmounted that way. So, we need to puut the profileId in dependency of useEffect to let it know when we what to refetch the data
  // IMPORTANT: React is very smart, So the useEffect will only and only unmount when the component is really removed from the dom or one of it's dependency changes, not when the url changes and that url also need that component.

  if (!data) return null;

  return (
    <div id='profile-cont' className='left-panel-cont'>
      <Stats data={data}/>

      <div id='profile-control' className='flex'>
        <div className='profile-options box' onClick={handle.clickMain}>
          <p style={{display: 'inline', marginRight:'var(--short-margin)'}}>{FollowText}</p>

          <FontAwesomeIcon className='fa-icon transition-fast' icon={faCaretDown} />
        </div>
        <div onClick={handle.goBack} className='profile-goback box transition-fast'>
          <FontAwesomeIcon className='fa-icon transition-fast' icon={faBackward} />
        </div>
      </div>
      <DropdownUni ref={dropdownRef} options={options} onChange={handle.onDropdownChange} onSelect={handle.onDropdownSelect}/>

      <Content data={data}/>
    </div>
  )
}

export default Profile