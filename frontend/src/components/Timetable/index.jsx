import React, { Component } from 'react';
import axios from 'axios';
import TimetableForm from '../TimetableForm';
import Time from '../Time';
import './index.css'

export default class index extends Component {
  state = {
    times: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`/timetable/subject/${this.props.subject._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.setState({ times: response.data.data }); 
    } catch (error) {
      console.error('Error fetching subject info:', error);
    }
  }

  render() {
    const { times } = this.state;

    return (
      <div>
        <h2>Timetable</h2>
          <div>
            <div className='times-container'>
              {times.map(time => (
                <Time key={time._id} {...time} />
              ))}
            </div>
            <TimetableForm subject={this.props.subject}/>
          </div>
      </div>
    );
  }
}
