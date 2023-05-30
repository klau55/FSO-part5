import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <a style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </a>
      <a style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabel2}</button>
      </a>
    </>
  )
}

export default Togglable