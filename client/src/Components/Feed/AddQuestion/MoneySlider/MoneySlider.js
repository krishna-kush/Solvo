import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

import './moneySlider.scss'


const MoneySlider = (params) => {
  const hideTime = 3000;
  const maxSliderValue = 1000;
  const [resetTimeout, setResetTimeout] = useState(null);

  let reset = () => {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
  
    const newTimeout = setTimeout(() => {
      // document.getElementById('money-slider').style.opacity = 0;
      params.setOpacity(0);
  
      setResetTimeout(null);
    }, hideTime);
  
    setResetTimeout(newTimeout);
  }

  const handleSliderChange = (event) => {
    // if-else, for not showing values 1-9
    if (event.target.value > params.skip_till) {params.setValue(event.target.value)}
    else {params.setValue(0)}

    reset();
  };

  const getClass = (opacity) => {
    if (params.opacity) {
      return 'transition-fast'
    } else {
      return 'transition-fast mouse-none'
    }
  }

  // for resetting opacity of slider when opacity changes to visible
  useEffect(() => {
    if (params.opacity !== 0) {
      reset();
    }
  }, [params.opacity]);

  return (
    <div id='money-slider' className={`${getClass(params.opacity)}`}>
      <FontAwesomeIcon style={{marginRight: "var(--short-margin)"}} className='fa-icon' icon={faIndianRupeeSign} />
      <div className="range-slider">
        <input
        className="range-slider__range" 
        type="range"
        min="0"
        max={maxSliderValue}
        value={params.value}
        onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default MoneySlider;
