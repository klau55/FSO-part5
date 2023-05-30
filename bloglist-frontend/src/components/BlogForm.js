import Blog from './Blog.js'

const BlogForm = ({ user, handleLogout, handleBlogChange, addBlog, blogs, newBlogVisible,setNewBlogVisible }) => {
  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }  

  return (
  <> 
    <div style={hideWhenVisible}>
      <button onClick={() => setNewBlogVisible(true)}>new Note</button>
    </div>

    <p>{user.name} logged in</p> 
    <button type="button" onClick={handleLogout}>Log out</button>
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
           {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
     )}
    </div>
  </>
  )
}


 export default BlogForm