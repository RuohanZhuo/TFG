import React, { Component } from 'react'

export default class index extends Component {
  render() {
      return (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
          <img src={`https://via.placeholder.com/150x150?text=${this.props.classroomName.charAt(0).toUpperCase()}`} alt={this.props.classroomName} />
          <h3>{this.props.classroomName}</h3>
        </div>
      );
  }
}
