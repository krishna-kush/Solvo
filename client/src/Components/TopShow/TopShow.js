import { useRef, useState } from 'react'

import './topShow.css'

import Cross from '../Cross/Cross'
import Block from './TopShowBlock'

export default () => {

  const [mouseInside, setMouseInside] = useState(false)
  const crossRef = useRef({})

  const handle = {
    toggleInside: (event, bool) => {
      if (event.target === event.currentTarget) { // because the onMouseEnter on top-show is also getting active when mouse enters the child elements of top-show like cross(confirmed), so it's to check the element on which the event is triggered is indeed the top-show
        setMouseInside(bool)
      }
    },

    onClickCross: () => {
      console.log('clicked');
    }
  }

  return (
    <div id="top-show" className="panel"
    onMouseEnter={(e)=>{handle.toggleInside(e, true)}}
    onMouseLeave={(e)=>{handle.toggleInside(e, false)}}>
      <Cross ref1={crossRef} parent={'topshow'} onClick={handle.onClickCross} mouseInside={mouseInside} setMouseInside={setMouseInside}/>

      <Block />
    </div>
  )
}