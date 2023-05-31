import Blog from './Blog.js'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, handleLogout, handleBlogChange, addBlog }) => {
  
  const [blogs, setBlogs] = useState([])
  const [blogsSortedByLikes, setBlogsSortedByLikes] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }  

  const sortByLikes = () => {
    console.log(blogs)
    setBlogsSortedByLikes(blogs.sort((a, b) => b.likes - a.likes)) 
    console.log(blogsSortedByLikes)
  }

  return (
  <> 
    <div>
      <p>{user.name} logged in</p> 
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
    <br></br>
    <div style={hideWhenVisible}>
      <button onClick={() => setNewBlogVisible(true)}>new Blog</button>
    </div>
    <div style={showWhenVisible}>
      <h3>New blog:</h3>
      <form onSubmit={addBlog}>
          <input name="title"
            onChange={handleBlogChange} placeholder="title"/>
          <input name="author"
            onChange={handleBlogChange} placeholder="author"/>
          <input name="url"
            onChange={handleBlogChange} placeholder="url"/>
          <button type="submit">save</button>
      </form>
      <button onClick={() => setNewBlogVisible(false)}>cancel</button>
    </div>      
     <h4>Blogs:</h4>
     <div>
      <button onClick={() => sortByLikes()}>SORT BY LIKES</button>
           {blogsSortedByLikes === null ?
           blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)
            :
           blogsSortedByLikes.map(blog =>
          <Blog key={blog.id} blog={blog} />
     )}
    </div>
  </>
  )
}


 export default BlogForm