import React, { useState, useEffect }  from 'react'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import Login from './components/Login'
import Blogs from './components/Blogs'

function App() {
  const nERROR = "errorNotification"
  const nOK = "okNotification"
  const userLocalStorageKey = 'loggedBlogappUser'

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notificationClass, setNotificationClass ] = useState(nERROR)
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')
  const [ user, setUser] = useState(null)
  const [ blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
    .getAll()
    .then(initialBlogs => { 
      setBlogs(initialBlogs) 
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userLocalStorageKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
         username, password,
      })
      window.localStorage.setItem(
        userLocalStorageKey, JSON.stringify(user)
      )       
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationClass(nERROR)
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem(userLocalStorageKey)
    setUser(null)
  }

  const handleCreateBlog = async (title, author, url) => {
    const newBlog = {
      "title": title,
      "author": author,
      "url": url,
      "likes": 0
    }
    try {
      const blog = await blogService.createBlog(newBlog)
      setNotificationClass(nOK)
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => { setErrorMessage(null) }, 5000)
      setBlogs(blogs.concat(blog))
    }
    catch(exception) {
      setNotificationClass(nERROR)
      setErrorMessage(exception.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleAddLike = async (blog) => {
    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const updatedBlog = await blogService.addLike(blog.id, updateBlog)
      setBlogs(blogs.filter(b => b.id.toString() !== blog.id.toString()).concat(updatedBlog))
    }
    catch(exception) {
      setNotificationClass(nERROR)
      setErrorMessage(exception.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.removeBlog(blog.id)
      setBlogs(blogs.filter(b => b.id.toString() !== blog.id.toString()))
    }
    catch(exception) {
      setNotificationClass(nERROR)
      setErrorMessage(exception.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

return (
    <div>
      <Notification message={errorMessage} notificationClass={notificationClass} />
      { user === null
        ? <Login handleLogin={handleLogin} 
            username={username} 
            setUsername={setUsername}
            password={password} 
            setPassword={setPassword}
          />
        : <Blogs username={user.name} 
            handleLogout={handleLogout}
            blogs={blogs}
            handleCreate={handleCreateBlog}
            handleAddLike={handleAddLike}
            handleRemove={handleRemove}
            user={user}
          />
      }
    </div>
  )
}

export default App;
