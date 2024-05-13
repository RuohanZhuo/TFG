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
                        <div
                            className="placeholder-image"
                            style={{
                                width: '100%',
                                height: '150px',
                                backgroundColor: '#123456', 
                                color: '#ffffff', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px', 
                            }}
                        >
                            {acronym}
                        </div>
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
