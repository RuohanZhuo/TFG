import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default class index extends Component {
  render() {
    return (
      <>
        <Nav.Link as={NavLink} to='/classroom'>Classroom</Nav.Link>
        <Nav.Link as={NavLink} to='/subject'>Subject</Nav.Link>
      </>
    );
  }
}
