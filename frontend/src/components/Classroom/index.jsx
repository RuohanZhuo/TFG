import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class ClassroomItem extends Component {
  handleSelect = () => {
    const { onSelect, _id } = this.props;
    onSelect(_id);
  };

  render() {
    const { classroomName, isEditing, isSelected } = this.props;

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
