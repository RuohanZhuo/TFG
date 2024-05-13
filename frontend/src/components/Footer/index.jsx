import React, { Component } from 'react'


export default class index extends Component {

  handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    }

  render() {
    return (
        <div></div>
    )
  }
}
