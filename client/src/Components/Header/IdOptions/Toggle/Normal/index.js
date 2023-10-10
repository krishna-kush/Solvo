import './index.scss'

const index = () => {
  return (
    <div className='toggle-normal toggle-normal-on' id='togle-normal-switch'>
	  <div className='toggle-normal-text-off'>OFF</div>
	  <div className='glow-comp'></div>
	  <div className='toggle-normal-button'></div>
	  <div className='toggle-normal-text-on'>ON</div>
	</div>  
  )
}

export default index