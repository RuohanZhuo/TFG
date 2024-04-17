import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import EnrollForm from '../EnrollForm'
import EnrolledList from '../EnrolledList'

export default class SubjectDetail extends Component {
  state = {
    subjectInfo: null,
    loading: true 
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:3001/subject/${this.props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.setState({ subjectInfo: response.data.data, loading: false }); 
    } catch (error) {
      console.error('Error fetching subject info:', error);
      this.setState({ loading: false }); 
    }
  }

  render() {
    const { subjectInfo, loading } = this.state;

    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      );
    }

    if (subjectInfo) {
      return (
        <div>
          <Container className="bg-white rounded p-4 mt-5 shadow-lg">
            <Row>
              <Col className="text-center">
                <h2>{subjectInfo.subjectName}</h2>
              </Col>
            </Row>
          </Container>
          <Container className="bg-white rounded p-4 mt-3 shadow-lg">
            <Row>
              <Col>
                <EnrollForm subject={subjectInfo} />
              </Col>
            </Row>
          </Container>
          <Container className="bg-white rounded p-4 mt-3 shadow-lg">
            <Row>
              <Col>
                <EnrolledList />
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="mt-5 text-center">
          <p>No se pudo obtener la información del sujeto.</p>
        </div>
      );
    }
  }
}