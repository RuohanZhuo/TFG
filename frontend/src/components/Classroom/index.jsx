import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './index.css';

export default class ClassroomItem extends Component {
  render() {
    const { classroomName, _id} = this.props;
    
    return (
      <div style={{ margin: '10px', padding: '10px', textAlign: 'center' }}>
          <Card style={{ width: '300px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                <NavLink to={`/timetable/classroom/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>   
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
                  </NavLink>
                  <Card.Body style={{ height: '100px' }}>
                    <NavLink to={`/timetable/classroom/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card.Title style={{ fontSize: '1.2rem', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{classroomName} </Card.Title>         
                    </NavLink>
                </Card.Body>
          </Card>
      </div>
  );
  }
}