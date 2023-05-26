import Blog from './Blog.js'

const BlogForm = ({ user, handleLogout, handleBlogChange, addBlog, blogs }) => {
    return (
    <> 
     <p>{user.name} logged in</p> 
     <button type="button" onClick={handleLogout}>Log out</button>
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