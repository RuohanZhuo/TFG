import React, { Component } from 'react'
import axios from 'axios';
import Schedule from '../Schedule'


export default class index extends Component {

    state = {
        schedules: [],
    };

    async componentDidMount() {

        const token = localStorage.getItem('token');
    
        try {
          const response = await axios.get(`/schedule/${this.props.subject._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.setState({ schedules: response.data.data }); 
        } catch (error) {
          console.error('Error fetching subject info:', error);
        }

    }

    render() {
        const {schedules} = this.state
        return (
          <div>
            <h2>Schedule</h2>
              <div>
                <div className='times-container'>
                  {schedules.map(schedule => (
                    <Schedule key={schedule._id} {...schedule} />
                  ))}
                </div>
              </div>
          </div>
        )
    }
}
