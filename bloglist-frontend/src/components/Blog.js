import Togglable from './Togglable.js'
import blogService from '../services/blogs.js'
import { useState } from 'react'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, deleteBlogs, blogToLike }) => {
  // eslint-disable-next-line no-unused-vars
  const [likes, setLikes] = useState(blog.likes)

  const blogToDelete = async() => {
    const result = window.confirm('You are about to delete '+ blog.title)
    if (result) {
      await blogService
        .deleteBlog(blog.id, blog)
      deleteBlogs(blog.id)
    }
  }

  const likeBlog = async () => {
    console.log(blog.likes)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(likedBlog.likes)


    const updatedBlog = await blogService
      .update(blog.id, likedBlog)
    console.log(updatedBlog.likes)
    setLikes(updatedBlog.likes)
    blogToLike()

  }

  return (
    <div style={blogStyle} className='blog' >
      <p>{blog.title} by {blog.author}</p>
      <Togglable buttonLabel="view" buttonLabel2="hide" >
        <p>url: {blog.url}</p>
        <p>likes: {likes} <button onClick={likeBlog}>like</button></p>
        <p>creator: {blog.creator}</p>
        {user.name === blog.creator ? <button onClick={blogToDelete}>delete</button> : ''}
      </Togglable>
    </div>
  )}

export default Blog