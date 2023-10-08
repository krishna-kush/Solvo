import { useState, useEffect, useRef } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

import './cross.scss'

const Cross = (params) => {

  // console.log(params);

  const componentRef = useRef(null)
  const mouseExited = useRef(false)

  const [show, setShow] = useState(false)
  const [mouseInside, setMouseInside] = useState(false)
  const [opacity, setOpacity] = useState(0)

  let timeout;
  const crossWaitTime = 3000;

  const handle = {
    leave: (event) => {
      setMouseInside(false)
      
      // to check if mouse is exited from right side or not, we want the mouse to be exited in a way in goes in parent container, not outside it, otherwise return false
      const { clientX, clientY } = event;
      const componentRect = event.target.getBoundingClientRect();

      // Calculate the x and y coordinates for the midpoint of the left and bottom sides
      const midXLeft = componentRect.left + (componentRect.width / 2);
      const midYBottom = componentRect.bottom - (componentRect.height / 2);

      // const isMouseOutsideComponent =
      //   clientX < componentRect.left || clientX > componentRect.right || clientY > componentRect.bottom;

      const isMouseOutsideComponentBiased =
      (clientX < componentRect.left && clientY > midYBottom) || // Half of the bottom part of the left side
      (clientY+5 > componentRect.bottom && clientX < midXLeft); // Half of the left part of the bottom side // added 5 because of error in calculation
      
      mouseExited.current = isMouseOutsideComponentBiased;

      if (!isMouseOutsideComponentBiased) { // is mouse is exited from wrong side the event mouseLeave on parent will not activate, as the mouse is on child when it leaved and child was positioned outside of parent, so we need to manually set mouseInside to false
        params.setMouseInside(false)
      }
    }
  }

  // to toggle cross visiblity
  useEffect(() => { 
    // console.log('mouseInside', mouseInside, 'params.mouseInside', params.mouseInside, 'mouseExited', mouseExited.current);

    if (mouseInside) {
      setOpacity(1)
    } else {
      setOpacity(0)
      if (!mouseExited.current) { // if mouse is exited from wrong side, then pointer events should not be disabled to allow user to interact on rest of page that is not clickable while cross-cont is active
        componentRef.current.style.pointerEvents = 'none'
      }
    }
  }, [mouseInside])

  // to toggle cross visiblity
  useEffect(() => {
    // console.log('params.mouseInside', params.mouseInside);
    if (params.mouseInside) {
      setOpacity(1)
      timeout = setTimeout(() => {
        setOpacity(0)
      }, crossWaitTime)
      componentRef.current.style.pointerEvents = 'all'
    } else {
      clearTimeout(timeout) // not clearing
      setOpacity(0)
      componentRef.current.style.pointerEvents = 'none' // only allowing user to interact with cross-cont while from inside the top panel
    }
  }, [params.mouseInside])

  // to toggle cross visiblity
  useEffect(() => {
    const cross = document.getElementById(`${params.parent}-cross`)
    cross.style.opacity = opacity
  }, [opacity])

  // useEffect(() => {
  //   // console.log(params.ref1);
  //   params.ref1.current.show = show
    
  // }, [show])

  // to position
  useEffect(() => {    
    if (componentRef.current) {
      const width = componentRef.current.getBoundingClientRect().width;
      const height = componentRef.current.getBoundingClientRect().height;

      const computedStyle = getComputedStyle(document.documentElement);
      const topshowPadding = computedStyle.getPropertyValue('--panel-padding');

      componentRef.current.style.transform = `translateX(-${width/2}px) translateY(-${(height/2)+(parseInt(topshowPadding))}px)` // pos it on oright top corner
      
      // componentRef.current.style.transform = `` // pos it on oright top corner
    }
  })
  
  return (
    <div ref={componentRef}
    onMouseEnter={(e)=>{setMouseInside(true)}}
    onMouseLeave={(e)=>{handle.leave(e)}}

    className='cross-cont'>
      <div id={`${params.parent}-cross`}
      className='cross circle shadow-dark transition'
      onClick={params.onClick}
      >
        <FontAwesomeIcon className='fa-icon fa-cross' icon={faX} />
      </div>
    </div>
  )
}

export default Cross