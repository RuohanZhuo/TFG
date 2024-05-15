import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './index.css';

export default class ClassroomItem extends Component {
  handleSelect = () => {
    const { onSelect, _id } = this.props;
    onSelect(_id);
  };

  render() {
    const { classroomName, _id, isEditing, isSelected } = this.props;

    return (
      <div style={{ margin: '10px', padding: '10px', textAlign: 'center', position: 'relative' }}>
        <Card style={{ width: '300px', margin: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', position: 'relative' }}>
          {isEditing && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={this.handleSelect}
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            />
          )}
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
              <Card.Title style={{ fontSize: '1.2rem', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{classroomName}</Card.Title>
            </NavLink>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
