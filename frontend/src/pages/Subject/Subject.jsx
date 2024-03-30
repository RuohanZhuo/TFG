import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Subject extends Component {
  render() {
    return (
      <NavLink className='button' to='/createSubject'>Create Subject</NavLink>
    )
  }
}
