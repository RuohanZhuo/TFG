import React, { Component } from 'react'
import UserLogout from '../../components/UserLogout'

export default class UserHeader extends Component {
  render() {
    return (
      <UserLogout onLogout={this.props.onLogout}/>      
    )
  }
}
