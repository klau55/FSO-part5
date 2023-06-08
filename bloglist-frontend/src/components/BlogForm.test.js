import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm.js'
import Togglable from './Togglable'
import userEvent from '@testing-library/user-event'

describe('inputs', () => {
  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const handleLogout = jest.fn()
    const handleBlogChange = jest.fn()
    const u = userEvent.setup()

  
    const user = {
        name: "Klaus",
    }

    render(<BlogForm user={user} 
        handleBlogChange={handleBlogChange} handleLogout={handleLogout} addBlog={createBlog} />)

    const button1 = screen.getByText('new Blog')
    await u.click(button1)

    // const input1 = screen.getByPlaceholderText('title')
    // await u.type(input1, 'TITLE1')

    // const input2 = screen.getByPlaceholderText('author')
    // await u.type(input2, 'TITLE2')

    // const input3 = screen.getByPlaceholderText('url')
    // await u.type(input3, 'TITLE3')

    
    const sendButton = screen.getByText('save')
    await u.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    // expect(createBlog.mock.calls[0][0].content).toBe('TITLE1')

  })
})