import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  notificationClass: PropTypes.string.isRequired
}


export default Notification