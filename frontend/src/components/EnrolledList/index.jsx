import React, { Component } from 'react';
import { ListGroup, Row, Col, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import Student from '../Student'
import './index.css';

export default class index extends Component {
  state = {
    students: [],
    searchQuery: ''
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3001//student/subject/${this.props.subject._id}`, {
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

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    const { students, searchQuery } = this.state;
    const filteredStudents = students.filter(student =>
      student.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Container style={{ maxWidth: '400px' }}>
        <Row className="justify-content-center">
          <Col>
            <h3>Enrolled Student List</h3>
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
                  <ListGroup.Item key={student._id} action>
                    <Row>
                      <Col sm={12}>
                        <div className="text-center">
                            <Student {...student} />
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
