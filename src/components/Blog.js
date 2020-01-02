import React, { useState } from 'react'


const Blog = ({ blog, handleAddLike, handleRemove, user }) => {
  const [detailVisible, setDetailVisible] = useState(null)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogClick = (event) => {
    event.preventDefault()
    setDetailVisible(!detailVisible)
  }

  const handleAddLikeClick = (event) => {
    event.preventDefault()
    handleAddLike(blog)
  }

  const handleRemovedClick = (event) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={handleBlogClick} className='toggleBlogInfo'>
        {blog.title} {blog.author}
        <div style={{ display: detailVisible ? '' : 'none' }} className='blogDetails'>
          {blog.url}<br />
          {blog.likes} likes <button onClick={handleAddLikeClick}>like</button><br />
          added by {blog.user.name}<br />
          <button style={{ display: user.username === blog.user.username ? '' : 'none' }} onClick={handleRemovedClick}>remove</button>
        </div>
      </div>
    </div>
  )
}


export default Blog