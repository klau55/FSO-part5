import Togglable from './Togglable.js'
import blogService from '../services/blogs.js'



const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => {

  const like = async () => {
    await blogService
      .like(blog.id, blog)
      .getAll()
  }

return (
  <div style={blogStyle}>
      {blog.title} 
      <Togglable buttonLabel="view" buttonLabel2="hide"> 
        <p>Author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={like}>like</button></p>
        <p>creator: {blog.creator}</p>
    </Togglable>
  </div>  
)}

export default Blog