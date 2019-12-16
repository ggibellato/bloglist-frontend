import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

function Blogs({ username, handleLogout, blogs, handleCreate, handleAddLike, handleRemove, user }) {
  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='new note'>
        <BlogForm handleCreate={handleCreate} handleAddLike={handleAddLike} />
      </Togglable>
      {blogs.sort((e1, e2) => e1.likes - e2.likes)
        .map(blog => <Blog key={blog.id} blog={blog}
          handleAddLike={handleAddLike}
          handleRemove={handleRemove}
          user={user}/>)}
    </div>
  )
}

export default Blogs