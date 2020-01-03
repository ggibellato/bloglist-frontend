import React from 'react'

const Login = ({ handleLogin, username, password }) => {
  return(
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} className='loginForm'>
        <div>
          username
          <input name="Username" {...username.input}/>
        </div>
        <div>
          password
          <input name="Password"{...password.input}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login