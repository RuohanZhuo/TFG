import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import './index.css'


export default class index extends Component {

    state = {
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        errors:{}
    }

    validateForm = () => {

      const { username, email, password, confirmPassword } = this.state

      const errors = {}

      if (username === '') {
        errors.username = 'Username is required'
      }
  
      if (email === '') {
        errors.email = 'Email is required'
      } else if (!email.endsWith('@alumnos.upm.es') && !email.endsWith('@upm.es')) {
        errors.email = 'Email must end with @alumnos.upm.es or @upm.es'
      } 
  
      if (password === '') {
        errors.password = 'Password is required'
      }
  
      if (confirmPassword === '') {
        errors.confirmPassword = 'Confirm Password is required'
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }

      this.setState({ errors });
      return Object.keys(errors).length === 0

    }

    onSubmit = async (event) => {

      event.preventDefault();

      if (!this.validateForm()) {
        return
      }
    
      try {
        
        const { username, email, password, confirmPassword } = this.state

        //const errors = {}

        const response = await axios.post('http://localhost:3001/reg', {
          username,
          email,
          password,
          confirmPassword,
        })
    
        const data = response.data;
      
        if (data.code === '0000') {
          console.log('Registro exitoso:', data)
        } else {
          console.log('Error en el registro:', data.msg)
        }

      } catch (error) {
        console.log('Error en la solicitud111:', error)
      }

    }

    changeHandle = (type) => (event) =>{
      this.setState({[type]:event.target.value})
    }

    render() {

      const {username, email, password, confirmPassword, errors} = this.state

      return (
      <form className='data-form' onSubmit={this.onSubmit}>
        <div className='container'>
          <h1 className="text-center mb-4">Sign Up</h1>
          <div className="mb-3">
            <input type="text" className={classnames("form-control", {'is-invalid':errors.username})} placeholder="Username" value={username} onChange={this.changeHandle('username')}/>
            {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
          </div>
            <div className="mb-3">
            <input type="email" className={classnames("form-control",{'is-invalid':errors.email})} placeholder="Email" value={email} onChange={this.changeHandle('email')} />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>
          <div className="mb-3">
            <input type="password" className={classnames("form-control",{'is-invalid':errors.password})} placeholder="Password" value={password} onChange={this.changeHandle('password')} />
            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
          </div>
          <div className="mb-3">
            <input type="password" className={classnames("form-control",{'is-invalid':errors.confirmPassword})} placeholder="Confirm assword" value={confirmPassword} onChange={this.changeHandle('confirmPassword')} />
            {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className='btn btn-primary btn-block'>Register</button>
          <p className='text-center mt-2'>
              Already have an account? <NavLink to='/login'>Log in</NavLink>
          </p>
        </div>
      </form>
      )
    }
}
