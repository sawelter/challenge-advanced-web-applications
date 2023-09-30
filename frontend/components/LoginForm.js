import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const { login, setMessage } = props;

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    setValues({username: values.username.trim(), password: values.password.trim()})
    login(values);
    setValues(initialFormValues);
  }

  const isDisabled = () => {
    // username is 3+ characters, password is 8+ characters
    return values.username.trim().length < 3 || values.password.trim().length < 8;
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <div className="loginmessage"><p>For the purposes of this application, the login is insecure; the username can be anything >3 characters, and the password can be anything >7 characters.</p></div>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
