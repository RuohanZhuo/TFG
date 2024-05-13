import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class ClassroomItem extends Component {
  render() {
    const { classroomName } = this.props;
    
    return (
      <div style={{ margin: '10px', padding: '10px', textAlign: 'center' }}>
          <Card style={{ width: '300px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
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
                  {classroomName.charAt(0).toUpperCase()}
              </div>
              <Card.Body>
                  <Card.Title style={{ fontSize: '1.2rem', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{classroomName}</Card.Title>
              </Card.Body>
          </Card>
      </div>
  );
  }
}