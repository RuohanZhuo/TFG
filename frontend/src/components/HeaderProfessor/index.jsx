import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class index extends Component {
  render() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
            <NavLink className='home-nav' to='/classroom'>Classroom</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className='home-nav' to='/subject'>Subject</NavLink>
        </li>
      </ul>
    )
  }
}
