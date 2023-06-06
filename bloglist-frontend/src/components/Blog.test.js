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

