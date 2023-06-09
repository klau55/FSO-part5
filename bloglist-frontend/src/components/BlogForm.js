import Blog from './Blog.js'
import { useState } from 'react'


const BlogForm = ({ user, handleLogout, addBlog, blogs, likeBlog, deleteBlogs }) => {


  // eslint-disable-next-line no-unused-vars
  const [blogsSortedByLikes, setBlogsSortedByLikes] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }


  // TODO: перенести сюда из аппа стейты, хендл блогченж. А отсюда в апп стейт блогс и юзэфект

  const sortByLikes = () => {
    setBlogsSortedByLikes(blogs.sort((a, b) => b.likes - a.likes))
  }

  const forwardForm = (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user,
      creator: user.name
    }
    addBlog(newBlog)
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
        <form onSubmit={forwardForm}>
          <input name="title"
            onChange={({ target }) => setNewTitle(target.value)} placeholder="title"/>
          <input name="author"
            onChange={({ target }) => setNewAuthor(target.value)} placeholder="author"/>
          <input name="url"
            onChange={({ target }) => setNewUrl(target.value)} placeholder="url"/>
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