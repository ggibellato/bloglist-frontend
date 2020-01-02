import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders default content', () => {
  const blog = {
    author :'author name',
    title : 'title',
    likes : 0,
    url : 'https://test.com',
    user : {
      username : 'testus1',
      name: 'test'
    }
  }

  const user = {
    username: 'testus1'    
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author name')

  const div = component.container.querySelector('.blogDetails')
  expect(div).toHaveStyle('display: none')
})  

test('toggle content', () => {
  const blog = {
    author :'author name',
    title : 'title',
    likes : 0,
    url : 'https://test.com',
    user : {
      username : 'testus1',
      name: 'test'
    }
  }

  const user = {
    username: 'testus1'    
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const toggleDiv = component.container.querySelector('.toggleBlogInfo')
  fireEvent.click(toggleDiv)

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author name')
  const div = component.container.querySelector('.blogDetails')
  expect(div).not.toHaveStyle('display: none')
})  
