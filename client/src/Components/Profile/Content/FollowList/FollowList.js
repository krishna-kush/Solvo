import './followList.scss'

import FollowListBlock from './FollowListBlock'

const Followers = (params) => {

  return (
    <div id='followlist-cont'>
      {params.data.map((ele, i) => {
        return (
          <FollowListBlock key={ele} id={ele}/>
        )
      })}
    </div>
  )
}

export default Followers