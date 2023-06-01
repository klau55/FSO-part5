import { useState } from 'react'
import PropTypes from 'prop-types'


// eslint-disable-next-line no-undef, no-unused-vars
const Togglable = props => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
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