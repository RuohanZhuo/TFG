import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Header from './components/Header'
import UserHeader from './pages/UserHeader/UserHeader'
import CreateClass from './pages/CreateClass/CreateClass'

export default class App extends Component {

  state = {
    isLoggedIn: false
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {

    const { isLoggedIn } = this.state;

    return (
      <div>
        <div>
          {isLoggedIn ? <UserHeader onLogout={this.handleLogout}/> : <Header />}  
        </div>
        <div>
          <Routes>
            <Route path="/" element={<div>This is Home page</div>} />
            <Route path="/sign" element={<SignUp />} />
            <Route path="/login" element={<Login onLogin={this.handleLogin}/>} />
            <Route path="/createClass" element={<CreateClass />} />
          </Routes>
        </div>
      </div>
    )
  }
}
