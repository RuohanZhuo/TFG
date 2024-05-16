import React, { Component } from 'react';

export default class index extends Component {
  render() {
    const { startTime, endTime, classroom } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Start Time: {startTime}</p>
          <p className="card-text">End Time: {endTime}</p>
          <p className="card-text">Classroom: {classroom.classroomName}</p>
        </div>
      </div>
    );
  }
}
