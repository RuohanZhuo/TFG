import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ListGroup } from 'react-bootstrap';
import Time from '../Time';

export default class Timetable extends Component {
  state = {
    times: [],
    selectedDate: new Date(),
    selectedTime: null,
  };

  async componentDidMount() {
    await this.fetchTimes();
  }

  fetchTimes = async () => {
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
  };

  handleDateChange = async (date) => {
    await this.fetchTimes();
    this.setState({ selectedDate: date, selectedTime: null });
  };

  handleTimeSelect = (time) => {
    this.setState({ selectedTime: time });
  };

  generateCombinedDate = (selectedTime) => {
    const { selectedDate } = this.state
    if (selectedTime) {
      const newDate = new Date(selectedDate)
      const newTime = new Date(selectedTime)
      const timezoneOffset = newTime.getTimezoneOffset() * 60000;
      const localDate = new Date(newTime.getTime() - timezoneOffset);
      newDate.setHours(localDate.getHours(), localDate.getMinutes(), 0, 0)
      return newDate;
    }
    return null;
  };

  handleFormSubmit = async () => {
    const token = localStorage.getItem('token')
        if (this.state.selectedTime) {
            const {startTime , endTime, subject, classroom} = this.state.selectedTime
            const combinedStartDate = this.generateCombinedDate(startTime)
            const combinedEndDate = this.generateCombinedDate(endTime)
            try {
                const response = await axios.post('http://localhost:3001/schedule', {
                    subject: subject,
                    startTime: combinedStartDate,
                    endTime: combinedEndDate,
                    classroom: classroom,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                console.log('Response:', response.data);
                if(response.data.code==='0000'){
                window.location.reload();
                }
            } catch (error) {
                console.error('Error submitting timetable:', error);
            }
            console.log('Nueva fecha combinada:', combinedStartDate, combinedEndDate);
    } else {
      alert('No se ha seleccionado una hora.');
    }
  };

  render() {
    const { selectedDate, times, selectedTime } = this.state;
    const selectedDayOfWeek = selectedDate.getDay(); 

    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const timesForSelectedDay = times.filter(time => time.dayOfWeek === selectedDayOfWeek);

    const isWithinOneWeek = selectedDate >= today && selectedDate <= oneWeekLater;

    return (
        <div className="container">
          <h2 className="mt-4 mb-3">Timetable</h2>
          <div className="d-flex flex-column align-items-center">
            <DatePicker
              selected={selectedDate}
              onChange={this.handleDateChange}
              dateFormat="MMMM dd, yyyy"
              className="form-control mb-3"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            {isWithinOneWeek && timesForSelectedDay.length > 0 ? (
              <ListGroup style={{ maxWidth: '400px' }}>
                {timesForSelectedDay.map(time => {
                  const timeDate = new Date(time.startTime);
                  const currentTime = new Date();
                  if (
                    currentTime.getDate() === selectedDate.getDate() &&
                    timeDate.getHours() >= currentTime.getHours()
                  ) {
                    return (
                      <ListGroup.Item
                        key={time._id}
                        action
                        active={selectedTime === time}
                        onClick={() => this.handleTimeSelect(time)}
                      >
                        <Time {...time} />
                      </ListGroup.Item>
                    );
                  } else if(currentTime.getDate() !== selectedDate.getDate()){
                    return (
                      <ListGroup.Item
                        key={time._id}
                        action
                        active={selectedTime === time}
                        onClick={() => this.handleTimeSelect(time)}
                      >
                        <Time {...time} />
                      </ListGroup.Item>
                    );
                  }
                  return null;
                })}
              </ListGroup>
            ) : (
              <p>No hay horarios disponibles para esta fecha.</p>
            )}
            <button className="btn btn-primary mt-3" onClick={this.handleFormSubmit}>
              Book
            </button>
          </div>
        </div>
      );
  }
}

