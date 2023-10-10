import './index.scss'

const Index = () => {
  const onClick = () => {
    
  }

  return (
    <label style={{margin: "auto"}} className="toggle-switch-day-night">
      <input onClick={onClick} type="checkbox" />
      <div className="toggle-switch-day-night__button"></div>
      <div className="toggle-switch-day-night__background"></div>
    </label>
  )
}

export default Index