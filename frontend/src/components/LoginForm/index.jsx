import React, { Component } from 'react'
import './index.css'

export default class index extends Component {

    sss = ()=>{

    }

  render() {
    return (
    <form className="data-form" onSubmit={this.sss}>
        <div className='container'>
            <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className='login-btn'>Login</button>
        </div>
    </form>
    )
  }
}
