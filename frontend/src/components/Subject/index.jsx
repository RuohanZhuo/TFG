import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default class SubjectItem extends Component {
    render() {
        const { acronym, subjectName, _id } = this.props;
        const rol = localStorage.getItem('rol');
        
        return (
            <Card style={{ width: '200px', margin: '10px' }}>
                <NavLink to={`/subject/${rol}/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Img variant="top" src={`https://via.placeholder.com/150x150?text=${acronym}`} alt={subjectName} />
                </NavLink>
                <Card.Body>
                    <NavLink to={`/subject/${rol}/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card.Title>{subjectName}</Card.Title>
                    </NavLink>
                </Card.Body>
            </Card>
        );
    }
}