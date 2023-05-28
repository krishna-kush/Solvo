import React from 'react'

export default (params) => {
  let setClass = (if_last) => {
    if (if_last) {
      return "feed-block last-feed"
    } else {
      return "feed-block"
    }
  }

  return (
    <div id={`${params.id}`} className={params.id==params.last_id?setClass(1):setClass(0)}>
      FeedBlocks {params.id}
    </div>
  )
}