import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Header from './components/Header'

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<div>This is Home page</div>} />
            <Route path="/sign" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    )
  }
}
