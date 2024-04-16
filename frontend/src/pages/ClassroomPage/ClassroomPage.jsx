import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ClassroomList from '../../components/ClassroomList'

export default class Classroom extends Component {
  render() {
    return (
      <div>
        <ClassroomList/>
        <div className="fixed-bottom text-center mb-3">
          <NavLink className="btn btn-primary button_nav" to="/classroom/createClass">
            Create Class
          </NavLink>
        </div>
      </div>
    )
  }
}