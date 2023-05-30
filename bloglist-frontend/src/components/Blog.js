import Togglable from './Togglable.js'

const Blog = ({blog}) => (
  <div>
    {blog.title} <Togglable buttonLabel="view" buttonLabel2="hide"> 
    <p>Author: {blog.author}</p>
    <p>url: {blog.url}</p>
    <p>likes: {blog.likes}</p>
  </Togglable>
  </div>  
)

export default Blog