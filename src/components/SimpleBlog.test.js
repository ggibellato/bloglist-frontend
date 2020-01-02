import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    author :'author name',
    title : 'title',
    likes : 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author name')
  expect(component.container).toHaveTextContent('blog has 0 likes')

  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})
