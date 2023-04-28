import React from 'react'

import FeedBlocks from './FeedBlocks'

const Feed = () => {
  // let feed_len = 5
  // let feed_blocks = []
  // for (let i=0; i < feed_len; i++) {
  //   feed_blocks.push(i)
  // }

  let feed_blocks = [1,2,3,4,5]
    

  return (
    <div id="feed">
      {feed_blocks.map((block) => {
        return <FeedBlocks key={block} id={block}/>
      })}
    </div>
  )
}

export default Feed