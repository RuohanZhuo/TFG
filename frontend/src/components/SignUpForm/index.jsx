import React, { Component } from 'react'
//import './index.css'

export default class index extends Component {

    state = {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    onSubmit = async(e)=>{

        e.preventDefault();
        const {username, email, password, confirmPassword} = this.state

        try {
            const response = await fetch('http://localhost:3001/reg', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, email, password, confirmPassword}),
            });
      
            const data = await response.json();
      
            if (data.code === '0000') {
              
              console.log('Registro exitoso:', data);
            } else {
              
              console.error('Error en el registro:', data.msg);
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

    const {username, email, password, confirmPassword} = this.state

    return (
    <form className='data-form' onSubmit={this.onSubmit}>
      <div className='container'>
        <h1 className="text-center mb-4">Register</h1>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username" value={username} onChange={this.changeHandle('username')} />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={this.changeHandle('email')} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.changeHandle('password')} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={this.changeHandle('confirmPassword')} />
        </div>
        <button type="submit" className='btn btn-primary btn-block'>Register</button>
      </div>
    </form>
    )
  }
}
