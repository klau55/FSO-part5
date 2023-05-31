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

const Blog = ({blog, user}) => {
  const [blogs, setBlogs] = useState([])

  const deleteBlog = async() => {
    window.confirm('You are about to delete '+ blog.title)
    await blogService
      .deleteBlog(blog.id, blog)
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))
  }

  const likeBlog = async () => {
    console.log(user.name)
    await blogService
      .like(blog.id, blog)
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))
  }

return (
  <div style={blogStyle}>
      {blog.title} 
      <Togglable buttonLabel="view" buttonLabel2="hide"> 
        <p>Author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>creator: {blog.creator}</p>
        {user.name === blog.creator ? <button onClick={deleteBlog}>delete</button> : ""}
    </Togglable>
  </div>  
)}

export default Blog