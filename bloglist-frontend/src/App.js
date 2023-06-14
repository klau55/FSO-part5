import { useState, useEffect } from 'react'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import './index.css'
import BlogForm from './components/BlogForm.js'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logging in with', username, password)
      setErrorMessage(`Logged in as ${username}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
        {message}
      </div>
    )
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()

    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    console.log('user logged out')

  }

  const addBlog = async (newBlog) => {

    try {
      await blogService
        .create(newBlog)
      setBlogs(blogs.concat(newBlog))

      setErrorMessage('Added new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Error! Check entries')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <BlogForm user={user} blogs={blogs} handleLogout={handleLogout}
          addBlog={addBlog} deleteBlogs={deleteBlogs} likeBlog={likeBlog} />
      }
    </div>
  )
}

export default App