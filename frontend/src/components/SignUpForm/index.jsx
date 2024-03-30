import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function SignUp(){

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
  });

  const navigate = useNavigate()

  const { username, email, password, confirmPassword, errors } = state

  const validateForm = () => {
    const errors = {}

    if (username.trim() === '') {
      errors.username = 'Username is required'
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!email.endsWith('@alumnos.upm.es') && !email.endsWith('@upm.es')) {
      errors.email = 'Email must end with @alumnos.upm.es or @upm.es'
    }

    if (password.trim() === '') {
      errors.password = 'Password is required'
    }

    if (confirmPassword.trim() === '') {
      errors.confirmPassword = 'Confirm Password is required'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setState({ ...state, errors });
    return Object.keys(errors).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const errors = {}

      const response = await axios.post('http://localhost:3001/reg', {
        username,
        email,
        password,
        confirmPassword,
      });

      const data = response.data

      if (data.code === '0000') {
        alert(data.msg);
        navigate('/login');
      }else if (data.code === '1006' || data.code === '1007') {
        errors[data.code === '1006' ? 'username' : 'email'] = data.msg;
      } else {
        console.log('error', data.msg);
      }


      setState({ ...state, errors });
    } catch (error) {
      console.log('Error en la solicitud:', error)
    }
  }

  const changeHandle = (type) => (event) => {
    setState({ ...state, [type]: event.target.value })
  }

      return (
      <form className='data-form' onSubmit={onSubmit}>
        <div className='container'>
          <h1 className="text-center mb-4">Sign Up</h1>
          <div className="mb-3">
            <input type="text" className={classnames("form-control", {'is-invalid':errors.username})} placeholder="Username" value={username} onChange={changeHandle('username')}/>
            {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
          </div>
            <div className="mb-3">
            <input type="email" className={classnames("form-control",{'is-invalid':errors.email})} placeholder="Email" value={email} onChange={changeHandle('email')} />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>
          <div className="mb-3">
            <input type="password" className={classnames("form-control",{'is-invalid':errors.password})} placeholder="Password" value={password} onChange={changeHandle('password')} />
            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
          </div>
          <div className="mb-3">
            <input type="password" className={classnames("form-control",{'is-invalid':errors.confirmPassword})} placeholder="Confirm assword" value={confirmPassword} onChange={changeHandle('confirmPassword')} />
            {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className='btn btn-primary btn-block mt-3'>Register</button>
          <p className="text-center mt-2">
          Already have an account?{' '}
          <span className="link" onClick={() => navigate('/login')}>Log in</span>
          </p>
        </div>
      </form>
      )
    
}


