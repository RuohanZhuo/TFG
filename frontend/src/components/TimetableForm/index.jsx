import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        <h3>Timetable Form</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Day of Week:
            <input type="number" name="dayOfWeek" value={dayOfWeek} onChange={this.handleChange} required />
          </label>
          <label>
            Start Time:
            <input type="time" name="startTime" value={startTime} onChange={this.handleChange} required />
          </label>
          <label>
            End Time:
            <input type="time" name="endTime" value={endTime} onChange={this.handleChange} required />
          </label>
          <label>
            Classroom:
            <select name="selectedClassroom" value={selectedClassroom ? selectedClassroom._id : ''} onChange={this.handleClassroomChange} required>
              <option value="">Select a Classroom</option>
              {classroomOptions.map(classroom => (
                <option key={classroom._id} value={classroom._id}>{classroom.classroomName}</option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    );
  }
}
