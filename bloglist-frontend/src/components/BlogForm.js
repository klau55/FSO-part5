import Blog from './Blog.js'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs.js'

const BlogForm = ({ user, handleLogout, handleBlogChange, addBlog }) => {

  const [blogs, setBlogs] = useState([])
  const [blogsSortedByLikes, setBlogsSortedByLikes] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)




  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])



  const sortByLikes = () => {
    setBlogsSortedByLikes(blogs.sort((a, b) => b.likes - a.likes))
    console.log(blogsSortedByLikes)
  }

  const deleteBlogs = (id) => {
    var blogsCopy = [...blogs.filter(b => b.id !== id)]
    setBlogs(blogsCopy)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService
      .update(blog.id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    console.log(blogs)
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} deleteBlogs={deleteBlogs} likeBlog={likeBlog} />
        )}
      </div>
    </>
  )
}


export default BlogForm