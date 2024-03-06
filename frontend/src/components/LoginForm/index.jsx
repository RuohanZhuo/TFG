import React, { Component } from 'react'
//import './index.css'

export default class index extends Component {

  state = {
      username:'',
      password:''
    }
    onSubmit = async(e)=>{
        e.preventDefault();
        const {username, password} = this.state

        try {
          const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
    
          if (data.code === '0000') {
            console.log('Inicio de sesión exitoso:', data);
          } else {
            console.error('Error en el inicio de sesión:', data.msg);

          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
    }

    changeHandle = (type)=>{
      return (event) =>{
          this.setState({[type]:event.target.value})
      }
    }

  render() {

    const {username, password} = this.state

    return (
    <form className="data-form" onSubmit={this.onSubmit}>
      <div className="container">
        <h1 className="text-center mb-4">Login</h1>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username" value={username} onChange={this.changeHandle('username')} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.changeHandle('password')}/>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </div>
    </form>
    )
  }
}
