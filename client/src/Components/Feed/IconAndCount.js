import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconAndCount = (params) => {

  return (
    <div className="icon-and-count">
      <FontAwesomeIcon className='fa-icon' icon={params.icon}/>
      
      <p className="icon-and-count-text nowrap">
      {(() => {
        if (params.count===0) {
          if (params?.if0Text===undefined) return params.count
          return ` ${params.if0Text}`
        }
        if (params?.text===undefined) return params.count
        return ` ${params.count} ${params.count > 1 ? params.text+'s' : params.text}`
      })()}
      </p>
    </div>
  )
}

export default IconAndCount