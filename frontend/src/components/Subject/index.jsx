import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './index.css';

export default class SubjectItem extends Component {
    render() {
        const { acronym, subjectName, _id } = this.props;
        const rol = localStorage.getItem('rol');
        
        return (
            <div className="card-container d-flex align-items-center justify-content-center">
                <Card className="mb-3" style={{ width: '300px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                    <NavLink to={`/subject/${rol}/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card.Img variant="top" src={`https://via.placeholder.com/150x150?text=${acronym}`} alt={subjectName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    </NavLink>
                    <Card.Body style={{ height: '100px' }}>
                        <NavLink to={`/subject/${rol}/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card.Title style={{ fontSize: '1.2rem', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subjectName}</Card.Title>
                        </NavLink>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
