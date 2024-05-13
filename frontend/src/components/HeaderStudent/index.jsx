import React, { Component } from 'react'
import { Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './index.css'

export default class index extends Component {
  render() {
    return (
          <>
            <Nav.Link as={NavLink} to='/mySubject'>My Subject</Nav.Link>
          </>
    )
  }
}
