import React, { Component } from 'react'

export default class index extends Component {
  render() {
    const {username, email} = this.props
    return (
      <div>
        <p>{username}</p>
        <small>Email: {email}</small>
      </div>
    )
  }
}
