import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    ) 

    const form = component.container.querySelector('form')
    expect(form).toHaveClass('loginForm')
  })

  test('if user logged, blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    console.log(App.userLocalStorageKey)
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))    

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blogDetails')
    ) 

    const blogs = component.container.querySelectorAll('.blogDetails')
    expect(blogs.length).toBe(2) 
  })
})