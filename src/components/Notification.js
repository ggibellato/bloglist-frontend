import React from 'react'

const Notification = ({ message, notificationClass }) => {
  if(message) {
    return(
      <div className={notificationClass}>
        {message}
      </div>
    )
  }
  return null
}

export default Notification