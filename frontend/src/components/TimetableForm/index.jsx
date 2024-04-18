import React, { Component } from 'react';
import axios from 'axios';
import './index.css'

export default class TimetableForm extends Component {
  state = {
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    classroomOptions: [],
    selectedClassroom: null,
    loading: false
  };

  async componentDidMount() {

    const token = localStorage.getItem('token')

    try {
      const response = await axios.get('http://localhost:3001/classroom', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ classroomOptions: response.data.data });
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClassroomChange = (e) => {
    const selectedClassroom = this.state.classroomOptions.find(classroom => classroom._id === e.target.value);
    this.setState({
      selectedClassroom
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    const { dayOfWeek, startTime, endTime, selectedClassroom } = this.state;
  
    const startHour = startTime.split(':')[0];
    const startMinute = startTime.split(':')[1];
    const endHour = endTime.split(':')[0];
    const endMinute = endTime.split(':')[1];

    try {
      this.setState({ loading: true });
      const response = await axios.post('http://localhost:3001/timetable', {
        dayOfWeek,
        startHour,
        startMinute,
        endHour,
        endMinute,
        subject: this.props.subject,
        classroom: selectedClassroom 
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response:', response.data);
      this.setState({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        selectedClassroom: null, 
        loading: false
      });
      if(response.data.code==='0000'){
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting timetable:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { dayOfWeek, startTime, endTime, classroomOptions, selectedClassroom, loading } = this.state;

    return (
      <div className='timetableForm shadow p-3 rounded'>
        <h3 className="mb-4">Timetable Form</h3>
        <form onSubmit={this.handleSubmit} className="row g-3 align-items-center">
          <div className="col-md-3">
            <label htmlFor="dayOfWeek" className="form-label">Day of Week:</label>
            <input type="number" id="dayOfWeek" name="dayOfWeek" value={dayOfWeek} onChange={this.handleChange} min={1} max={7} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label htmlFor="startTime" className="form-label">Start Time:</label>
            <input type="time" id="startTime" name="startTime" value={startTime} onChange={this.handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label htmlFor="endTime" className="form-label">End Time:</label>
            <input type="time" id="endTime" name="endTime" value={endTime} onChange={this.handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label htmlFor="selectedClassroom" className="form-label">Classroom:</label>
            <select id="selectedClassroom" name="selectedClassroom" value={selectedClassroom ? selectedClassroom._id : ''} onChange={this.handleClassroomChange} className="form-select" style={{ height: '38px' }} required>
              <option value="">Select a Classroom</option>
              {classroomOptions.map(classroom => (
                <option key={classroom._id} value={classroom._id}>{classroom.classroomName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    );
    
    
  }
}
