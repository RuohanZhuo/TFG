import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './index.css'

export default function Logout(props) {

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault()

    try {

      const response = await axios.post('http://localhost:3001/logout');

      const data =  response.data;

      if (data.code === '0000') {
        alert('logout exitoso');
        console.log(data)
        props.onLogout()
        navigate('/');
      }

    } catch (error) {
      console.error('Error en el logout:', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className='home-nav' to='/'>Home</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li>
              <form onSubmit={onSubmit}>
              <button type="submit" className='logout-nav'>logout</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

