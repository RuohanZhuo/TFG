import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'

export default class index extends Component {
  render() {
    return (
      <nav className='nav-bar'>
        <div>
            <NavLink className='home-nav' to='/'>Home</NavLink>
            <div>
                <ul>
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
