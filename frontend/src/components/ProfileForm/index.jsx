import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, Row, Col } from 'react-bootstrap'

export default class Index extends Component {

    state = {
      showPasswordForm: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      userData: {
        username: localStorage.getItem('username'),
        rol: localStorage.getItem('rol')
      }
    }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = this.state
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.')
      return;
    }

    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch(
        'http://localhost:3001/user/password',
        {
          oldPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
      alert('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.')
    }
  }

  togglePasswordForm = () => {
    this.setState((prevState) => ({ showPasswordForm: !prevState.showPasswordForm }))
  }

  render() {
    const { username, rol } = this.state.userData
    const { oldPassword, newPassword, confirmPassword, showPasswordForm } = this.state

    return (
      <div className="container mt-4 p-4 bg-white rounded">
        <h1 className="text-center mb-4">User Information</h1>
        <Form>
          <Row className="mb-3">
            <Form.Label column sm="2" className="fw-bold text-start">
              Username:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={username} readOnly />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm="2" className="fw-bold text-start">
              Rol:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={rol} readOnly />
            </Col>
          </Row>
          <Row>
            <Form.Label column sm="2" className="fw-bold text-start">
              Password:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" value="9999999999" readOnly />
            </Col>
          </Row>
          <Row>
              {!showPasswordForm && (
                  <Button variant="primary" onClick={this.togglePasswordForm} className="float-end">
                      Change password
                  </Button>
              )}
            </Row>
        </Form>

        {showPasswordForm && (
          <div className="mt-4">
            <h2 className="text-center mb-4">Change password</h2>
            <Form onSubmit={this.handleSubmit}>
              <Row className="mb-3">
                <Form.Label column sm="2" className="fw-bold text-start">
                  Old password:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label column sm="2" className="fw-bold text-start">
                  New password:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label column sm="2" className="fw-bold text-start">
                  Confirm new password:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                    <Button variant="primary" type="submit" className="ml-2">
                        Change password
                    </Button>
                </Col>
                <Col>
                    <Button variant="danger" type="button" onClick={this.togglePasswordForm}>
                        Cancel
                    </Button>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </div>
    )
  }
}