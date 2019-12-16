import React from 'react'
import CreateBlog from './CreateBlog'
import Blog from './Blog'

const Blogs = ({username, handleLogout, blogs, handleCreate}) => (
  <div>
    <h2>blogs</h2>
    <p>{username} logged in <button onClick={handleLogout}>logout</button></p> 
    <CreateBlog handleCreate={handleCreate} />
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>
)

export default Blogs;