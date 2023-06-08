import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog.js'
import Togglable from './Togglable'
import userEvent from '@testing-library/user-event'

describe('<Togglable />', () => {
  test('renders content', () => {
    const blog = {
      title: 'TEST1',
      author: 'TEST2',
      url: 'TEST3',
      likes: 5,
      creator: 'TEST5'
    }

    const user = {
      name: "root",
      username: "red",
      id: 5001
    }
    const {container} = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('TEST1', 'TEST2')
  })
  test('togglable content not showing', () => {
    const blog = {
      title: 'TEST1',
      author: 'TEST2',
      url: 'TEST3',
      likes: 5,
      creator: 'TEST5'
    }

    const user = {
      name: "root",
      username: "red",
      id: 5001
    }
    const {container} = render(<Blog blog={blog} user={user} />)
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    screen.debug()
  })
})
describe('5.13 url and likes get shown when button "show" is clicked', () => {
  test('renders content', async () => {
    const blog = {
      title: 'TEST1',
      author: 'TEST2',
      url: 'TEST3',
      likes: 5,
      creator: 'TEST5'
    }

    const user = {
      name: "root",
      username: "red",
      id: 5001
    }
    const mockHandler = jest.fn()
    const {container} = render(<Blog blog={blog} user={user} showWhenVisible={mockHandler} />)
    
    const u = userEvent.setup()
    const button = screen.getByText('view')
    await u.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('likes: 5', 'TEST5')
  })
  
})
describe('5.14', () => {
  
  const mockHandler = jest.fn()

  test('like clicked twice', async () => {
    const blog = {
      title: 'TEST1',
      author: 'TEST2',
      url: 'TEST3',
      likes: 5,
      creator: 'TEST5'
    }

    const user = {
      name: "root",
      username: "red",
      id: 5001
    }
    render(<Blog blog={blog} user={user} likeBlog={mockHandler} />)
    
    const u = userEvent.setup()
    const button = screen.getByText('view')
    await u.click(button)

    const like = screen.getByText('like')
    await u.click(like)
    await u.click(like)


    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  
})
