import React, { Component } from 'react'
import './index.css'

export default class index extends Component {

    sss = ()=>{

    }

  render() {
    return (
    <form className="data-form" onSubmit={this.sss}>
      <div className="container">
        <h1 className="text-center mb-4">Login</h1>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </div>
    </form>
    )
  }
}
