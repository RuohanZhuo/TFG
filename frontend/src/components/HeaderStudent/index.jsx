import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class index extends Component {
  render() {
    return (
        <div>
            <li className="nav-item">
                <NavLink className='home-nav' to='/mySubject'>My Subject</NavLink>
            </li>
      </div>
    )
  }
}
