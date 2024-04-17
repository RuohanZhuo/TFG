import React, { Component } from 'react';
import { Button, ListGroup, Row, Col, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import './index.css';

export default class StudentsList extends Component {
  state = {
    students: [],
    selectedStudent: null,
    searchQuery: ''
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/student', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        this.setState({ students: response.data.data });
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }

  handleSelectStudent = (student) => {
    this.setState({ selectedStudent: student });
  }

  handleSendStudent = () => {
    const { selectedStudent } = this.state;
    const token = localStorage.getItem('token');

    if (!selectedStudent) {
      console.error('Debes seleccionar un alumno antes de enviarlo.');
      return;
    }

    axios.post('http://localhost:3001/studentSubject', {
      student: selectedStudent,
      subject: this.props.subject
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if(response.data.code==='0000'){
            alert('sucess');
        }else {
            alert('failed')
        }
      })
      .catch(error => {
        console.error('Error sending student:', error);
      });
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    const { students, selectedStudent, searchQuery } = this.state;
    const filteredStudents = students.filter(student =>
      student.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Container style={{ maxWidth: '400px' }}>
        <Row className="justify-content-center">
          <Col>
            <h2>Lista de Alumnos</h2>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar alumno"
                value={searchQuery}
                onChange={this.handleSearchChange}
              />
            </Form.Group>
            <div className="list-container">
              <ListGroup>
                {filteredStudents.map(student => (
                  <ListGroup.Item key={student._id} action onClick={() => this.handleSelectStudent(student)}>
                    <Row>
                      <Col sm={12}>
                        <div className="text-center">
                          <div>{student.username}</div>
                          <small>Email: {student.email}</small>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <Button variant="success" onClick={this.handleSendStudent} disabled={!selectedStudent}>
                Matricular
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

