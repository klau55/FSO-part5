import { useState, useEffect } from 'react'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import './index.css'
import BlogForm from './components/BlogForm.js'

const App = () => {

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
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



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogChange = (event) => {
    setNewTitle(event.target.value)
    setNewAuthor(event.target.value)
    setNewUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
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

  const addBlog = async () => {

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user,
      creator: user.name
    }

    try {
      await blogService
        .create(newBlog)
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
        <BlogForm user={user} handleLogout={handleLogout}  handleBlogChange={handleBlogChange}
          addBlog={addBlog}  />
      }
    </div>
  )
}

export default App