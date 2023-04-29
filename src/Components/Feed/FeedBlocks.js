import React from 'react'

const FeedBlocks = (params) => {
  return (
    <div id={`${params.id}`} className="feed-block">
      FeedBlocks {params.id}
    </div>
  )
}

export default FeedBlocks