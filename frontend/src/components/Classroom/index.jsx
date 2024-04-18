import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class ClassroomItem extends Component {
  render() {
    const { classroomName } = this.props;
    
    return (
      <div style={{ margin: '10px', padding: '10px', textAlign: 'center' }}>
        <Card style={{ width: '300px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
            <Card.Img variant="top" src={`https://via.placeholder.com/150x150?text=${classroomName.charAt(0).toUpperCase()}`} alt={classroomName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          <Card.Body>
              <Card.Title style={{ fontSize: '1.2rem', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{classroomName}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}