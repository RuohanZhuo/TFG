import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'

export default class index extends Component {
  render() {
    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className='home-nav' to='/'>Home</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li>
              <NavLink className='sign-nav' to='/sign'>Sign Up</NavLink>
            </li>
            <li>
              <NavLink className='login-nav' to='/login'>Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}
