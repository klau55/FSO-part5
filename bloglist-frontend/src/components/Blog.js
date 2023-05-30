import Togglable from './Togglable.js'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => (
  <div style={blogStyle}>
      {blog.title} 
      <Togglable buttonLabel="view" buttonLabel2="hide"> 
        <p>Author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes}</p>
        <p>creator: {blog.creator}</p>
    </Togglable>
  </div>  
)

export default Blog