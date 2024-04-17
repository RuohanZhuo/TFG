import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Header from './components/Header'
import UserHeader from './pages/UserHeader/UserHeader'
import ClassroomPage from './pages/ClassroomPage/ClassroomPage'
import CreateClass from './pages/CreateClass/CreateClass'
import CreateSubject from './pages/CreateSubject/CreateSubject'
import SubjectPage from './pages/SubjectPage/SubjectPage'
import MySubjectPage from './pages/MySubjectPage/MySubjectPage'
import SubjectDetailPage from './pages/SubjectDetailPage/SubjectDetailPage'
import SubjectDetailStudentPage from './pages/SubjectDetailStudentPage/SubjectDetailStudentPage'


export default class App extends Component {

  state = {
    authToken: localStorage.getItem('token'),
  }

  handleLogin = (data) => {
    this.setState({ authToken: data.token});
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('rol', data.rol);
  }

  handleLogout = () => {
    this.setState({ authToken: null });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
  }


  render() {

    const { authToken } = this.state;

    return (
      <div>
        <div>
          {authToken ? <UserHeader onLogout={this.handleLogout} /> : <Header />}
        </div>
        <div>
          <Routes>
            <Route path="/" element={<div>This is Home page</div>} />
            <Route path="/sign" element={<SignUp />} />
            <Route path="/login" element={<Login onLogin={this.handleLogin} />} />
            <Route path="/classroom" element={<ClassroomPage />} />
            <Route path="/subject" element={<SubjectPage />} />
            <Route path="/classroom/createClass" element={<CreateClass />} />
            <Route path="/subject/createSubject" element={<CreateSubject />} />
            <Route path="/mySubject" element={<MySubjectPage />} />
            <Route path="/subject/professor/:id" element={<SubjectDetailPage />} />
            <Route path="/subject/student/:id" element={<SubjectDetailStudentPage />} />
          </Routes>
        </div>
      </div>
    )
  }
}
