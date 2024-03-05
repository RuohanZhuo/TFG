import React, { Component } from 'react'
import './index.css'

export default class index extends Component {

    state = {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    onSubmit = async(e)=>{

        e.preventDefault();
        const {username, email, password} = this.state

        try {
            const response = await fetch('http://localhost:3001/reg', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, email, password }),
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
                <h1>Register</h1>
                <input type="text" placeholder="Username" value={username} onChange={this.changeHandle('username')}/>
                <input type="email" placeholder="Email" value={email} onChange={this.changeHandle('email')}/>
                <input type="password" placeholder="Password" value={password} onChange={this.changeHandle('password')}/>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={this.changeHandle('confirmPassword')}/>
                <button className='register-btn'>Register</button>
            </div>  
        </form>  
    )
  }
}
