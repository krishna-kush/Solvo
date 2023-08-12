import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'


const MoneySlider = (params) => {
  const maxSliderValue = 1000;
  const [resetTimeout, setResetTimeout] = useState(null);

  let reset = () => {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
  
    const newTimeout = setTimeout(() => {
      document.getElementById('money-slider').style.opacity = 0;
  
      setResetTimeout(null);
    }, 3000);
  
    setResetTimeout(newTimeout);
  }

  const handleSliderChange = (event) => {
    params.setValue(event.target.value);

    reset();
  };

  useEffect(() => {
    if (params.opacity !== 0) {
      reset();
    }
  }, [params.opacity]);

  return (
    <div id='money-slider' className='transition-fast'>
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
