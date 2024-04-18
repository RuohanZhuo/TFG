import React, { Component } from 'react';
import axios from 'axios';
import TimetableForm from '../TimetableForm';
import Time from '../Time';

export default class index extends Component {
  state = {
    times: [],
    showTimetableForm: false,
    loading: true
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`/timetable/subject/${this.props.subject._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.setState({ times: response.data.data, loading: false }); 
    } catch (error) {
      console.error('Error fetching subject info:', error);
      this.setState({ loading: false }); 
    }
  }

  toggleTimetableForm = () => {
    this.setState((prevState) => ({
      showTimetableForm: !prevState.showTimetableForm
    }));
  };

  render() {
    const { times, showTimetableForm, loading } = this.state;

    return (
      <div>
        <h2>Timetable</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {times.map(time => (
              <Time key={time._id} {...time} />
            ))}
            <button onClick={this.toggleTimetableForm}>
              {showTimetableForm ? 'Cancel' : 'Add new'}
            </button>
            {showTimetableForm && <TimetableForm subject={this.props.subject} />}
          </div>
        )}
      </div>
    );
  }
}
