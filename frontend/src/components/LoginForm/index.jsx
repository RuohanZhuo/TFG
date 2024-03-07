import React, { useState } from 'react';
import axios from 'axios'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function Login(props){

  const [state, setState] = useState({
    username: '',
    password: '',
    errorLogin:''
  });

  const navigate = useNavigate();

  const { username, password, errorLogin } = state;

  const onSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      const data =  response.data;

      if (data.code === '0000') {
        alert('Inicio de sesión exitoso');
        console.log(data)
        props.onLogin()
        navigate('/');
      } else if (data.code === '1003'){
        setState({ ...state, errorLogin: data.msg });
      }else{
        console.error('Error en el inicio de sesión:', data.msg);
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const changeHandle = (type) => (event) => {
    setState({ ...state, [type]: event.target.value });
  };

  return (
    <form className="data-form" onSubmit={onSubmit}>
      <div className="container">
        <h1 className="text-center mb-4">Login</h1>
        <div className="mb-3">
          <input type="text" className={classnames("form-control",{'is-invalid':errorLogin==='Incorrect username'})} placeholder="Username" value={state.username} onChange={changeHandle('username')}/>
        </div>
        <div className="mb-3">
          <input type="password" className={classnames("form-control",{'is-invalid':errorLogin==='Incorrect password'})} placeholder="Password" value={state.password} onChange={changeHandle('password')}/>
          {errorLogin && <div>{errorLogin}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <p className="text-center mt-2">
          Don't have an account?{' '}
          <span className="link" onClick={() => navigate('/sign')}>Sign up</span>
        </p>
      </div>
    </form>
  );
};

