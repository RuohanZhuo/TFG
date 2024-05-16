import React, { Component } from 'react';

export default class Index extends Component {

  render() {
    const { startTime, endTime, classroom } = this.props;

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const localStartDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);
    const localEndDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000);

    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    };
    
    const formattedStartTime = localStartDate.toLocaleString('en-GB', options).replace(',', '');
    const formattedEndTime = localEndDate.toLocaleString('en-GB', options).replace(',', '');

    return (
      <div className="card">
        <div className="card-body">
          <span>{formattedStartTime}</span> - <span>{formattedEndTime}</span>
          <p className="card-text">Classroom: {classroom.classroomName}</p>
        </div>
      </div>
    );
  }
}
