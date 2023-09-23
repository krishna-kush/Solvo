import React, { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faArrowUpFromBracket as faShare, faExpand, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state'

import { toggle } from '../../Utils/Basic'
import { DropdownOptionsReduced } from '../../Utils/DropdownOptions'

import TextEditor from '../TextEditor/SunEditor/TextEditor'

import Id from './Id/Id'
import Comments from './Comments/Comments'
import Dropdown from '../Dropdown/Dropdown'
import IconAndCount from './IconAndCount/IconAndCount'


export default React.memo((params) => { // React's memo is a Higher-Order Component (HOC) that is used to preventing unnecessary re-renders when params don't change
  const dispatch = useDispatch();

  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  // useEffect(() => {
  //   const a = document.getElementsByClassName(`dot-inner`)[0].style.height 
  //   console.log(a);
  // }, [])

  
  const data = useSelector((state) => state.post[params.id]);
  const profile = useSelector((state) => state.auth.authData);
  // console.log(data, profile);
  
  const optionsBtnRef = useRef(null);

  // -----------------------------------------------------
  const is_same = data.creator._id === profile._id;
  // console.log(is_same);


  const dropdownRef = useRef(null);

  const dropdownOptionsAll = [
    {
      optionName: 'Delete',
      optionCondition: {
        show: is_same,
      }
    },
    {
      optionName: 'Report',
      optionCondition: {
        show: !is_same,
      },
    },
    {
      id: 'take',
      optionName: ['Remove Take', 'Apply For Take'],
      optionCondition: {
        show: !is_same,
        what_to_show: data.taken.includes(profile._id) ? 0 : 1, // because of the take defination mentioned in handle.dropdown.take, even if it's seen logical to return 1 when data.taken.includes(profile._id) is true, But we are returning 0, because it's the direction defined in the take defination for the specific case...
      }
    },
  ]
  
  const handle = {
    dropdown: {
      onChange: (to) => {},

      onSelect: [
        // Delete
        async () => {
          const temp = await actionCreators.post.deletePost(params.id, data._id)
    
          if (temp.status!==200) {
            alert(`Can\'t Delete Post: ${temp.message}.`)
          } else {
            temp.dispatch(dispatch)
            alert(`${temp.message}.`)
          }
        },

        // Report
        () => {},

        // Take
        // async (direction) => {
        async () => {
          /*
          Defined As:
          Apply For Take: 1
          Remove Take: 0
          Resoning: It's direction of take, if it's 1, then it's apply for take, if it's 0, then it's remove take or remove the id from take.
          */


          // Finding Current Direction for Take
          const direction = dropdownRef.current.extras.take === undefined
          ? dropdownOptionsAll[2].optionCondition.what_to_show // toggle take for first time
          : dropdownRef.current.extras.take // to reverse the value of previous take if any

          // consultaion for take
          const confirmation = window.confirm("Taking a post means that you are Declaring to Author that you are from now on going to start working on the Question and requesting him to not delete the Post for {this} Period of Time. Do you Agree?");
    
          if (confirmation) {
            // check time for take
            const time_diff = new Date() - new Date(data.createdAt)
    
            const time_diff_allowed = 2 * 3600000 // millisecondsInOneHour -> 60 * 60 * 1000
    
            if (time_diff < time_diff_allowed) {
              alert(`It's not been 2 hours yet till Post Posted, Your still have to wait {this} time, to take the question into your custody.`)
            } else {
              // apply for take
              const temp = await actionCreators.post.take(data._id, profile._id, direction)
        
              if (direction) {
                if (temp.status===200) {
                  alert('Applied for Take')
                } else {
                  alert('Can\'t Apply for Take, Some Error.')
                }
              } else {
                if (temp.status===200) {
                  alert('Removed Take Successfully')
                } else {
                  alert('Can\'t Remove Take, Some Error.')
                }
              }

              // TOGGLE TAKE
              // adding take to dropdown with index value of option name of take option. So, by changing the Extras field in dropdown which is a reactive variable, we'll be able to change the option name of take option, by re-rendering the dropdown, without re-rendering the whole parent component.
              dropdownRef.current.pushExtras({
                take: !direction?1:0, // converting bool to int because to use it as index of option name
              });
            }
          }
        },
      ],
    }
  }
  // -----------------------------------------------------

  const [inputData, setInputData] = useState('')
  const [showComments, setShowComments] = useState(false)
  
  const upAnswer = async (firstToAns) => {
    const temp = await actionCreators.post.upAnswer(inputData, data._id, profile._id, profile.source, params.id)
    dispatch(temp)

    if (firstToAns) {setShowComments(true)}
  }

  const setClass = (if_last) => {
    if (if_last) {
      return "feed-block last-feed"
    } else {
      return "feed-block"
    }
  }

  const firstToAns = () => {
    if (data?.answers.length) return `Write your answer...`
    return `Be the first to answer...`
  }

  if (!data)  {
    return (
      <div >Loading...</div>
    )
  } 

  return (
    <div
    // id={`${data.id}`}
    className={data?.last?setClass(1):setClass(0)}>
      <div className="feed-head flex">
        <div className="feed-head-id">
          <Id _id={data.creator._id} source={data.creatorRefModel} createdAt={data.createdAt} full={true}/>
        </div>
        <div className='feed-head-options flex'>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <FontAwesomeIcon className='fa-icon' icon={faExpand} />
            </div>
          </div>
          <div id={`dropdown${params.id}`} style={{position:'relative'}} className='feed-head-options-child'>
            <div className="more box" onClick={() => {toggle(dropdownRef.current.show, dropdownRef.current.setShow)}}> {/* This dropdown is getting populating from within Dropdown Component, see Dropdown for more info. */}
              <FontAwesomeIcon ref={optionsBtnRef} className='fa-icon' icon={faEllipsis}/>
            </div>

            <Dropdown ref={dropdownRef} options={DropdownOptionsReduced(dropdownOptionsAll, handle)} btnRef={optionsBtnRef} position={'left'} onChange={handle.dropdown.onChange} onSelect={handle.dropdown.onSelect} />
          </div>
        </div>
      </div>

      <div className="question-bar">
        <div className="question-bar-top">
          <div className="question" dangerouslySetInnerHTML={{ __html: data.question }}></div>
          
          <div className="question-details">
            {data.hide==='selected'?
            <div className="small-box question-details-child">
              Selected Answer Hidden
            </div>
            :<></>}
            <div className="small-box question-details-child">
              {data.amount?`₹${data.amount}`:"Free"}
            </div>
            <div className="small-box question-details-child">
              {data.closed? "Closed" : "Open"}
            </div>
          </div>

        </div>
      </div>


      <div className="interact-answers-cont">
        <hr className='interact-answers-hr'/>

        <div className="interact-answers">
          <div className='interact-answers-child box'
          onClick={() => {toggle(showComments, setShowComments)}}
          >
            <IconAndCount icon={faComment} count={data.answers.length} text={'Answer'} if0Text={data.closed? 'Closed' : 'Not Answered'} />
          </div>

          <div className='interact-answers-child box'>
            <IconAndCount icon={faShare} count={0} text={'Share'} />
          </div>
        </div>

        <hr className='interact-answers-hr'/>
      </div>

      {(showComments && data.answers.length)? (
        <div className="answers">
          <div className="answer">
            {/* {data.ans.map((ans, index) => { */}
              <Comments id={params.id}/>
            {/* }} */}
          </div>
        </div>

      ) : (<></>)}

      {(!data.closed && (!data.answers.length || showComments)) ? (
        <div ref={textContainerRef} className='text-and-btn-wrapper'>
          <TextEditor
          ref={textContainerControlRef}
          parentRef={textContainerRef}

          placeholder={firstToAns()}
          change={(data) => {setInputData(data)}}
          />

          <div
          onClick={() => {
            upAnswer(data?.answers.length?false:true)
            textContainerControlRef.current.setContents('');
            textContainerControlRef.current.offToolbar();
          }}
          className='feed-more'>
            <p>POST</p>
          </div>
        </div>
        ) : (<></>)}
      
    </div>
  )
})