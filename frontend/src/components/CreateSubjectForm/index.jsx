import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function CreateSubject(){

  const [state, setState] = useState({
    subjectName: '',
    capacity: '',
    errors: {},
  });

  const navigate = useNavigate()

  const { subjectName, capacity, errors } = state

  const validateForm = () => {
    const errors = {}

    if (subjectName.trim() === '') {
      errors.subjectName = 'Subject name is required'
    }

    if (capacity === '0' || capacity.trim() === '') {
      errors.capacity = 'The capacity minimum is 1';
    }

    setState({ ...state, errors });
    return Object.keys(errors).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token');

    if (!validateForm()) {
      return
    }

    try {
      const errors = {}

      const response = await axios.post('http://localhost:3001/subject', {
        subjectName,
        capacity,
      },{
        headers: {
        'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data

      if (data.code === '0000') {
        alert(data.msg);
        navigate('/subject');
      }else if (data.code === '1006') {
        errors.subjectName = data.msg;
      } else {
        console.log('error', data.msg);
      }

      setState({ ...state, errors });
    } catch (error) {
      console.log('Error en la solicitud:', error)
    }
  }

  const changeHandle = (type) => (event) => {
    setState({ ...state, [type]: event.target.value })
  }

  const handleCancel = () => {
    navigate('/subject');
  };

      return (
      <form className='data-form' onSubmit={onSubmit}>
        <div className='container'>
          <h1 className="text-center mb-4">Create class</h1>
          <div className="mb-3">
            <input type="text" className={classnames("form-control", {'is-invalid':errors.subjectName})} placeholder="Subject name" value={subjectName} onChange={changeHandle('subjectName')}/>
            {errors.subjectName && <div className='invalid-feedback'>{errors.subjectName}</div>}
          </div>
          <div className="mb-3">
            <input type="number"  min="0" className={classnames("form-control",{'is-invalid':errors.capacity})} placeholder="Capacity" value={capacity} onChange={changeHandle('capacity')} />
            {errors.capacity && <div className='invalid-feedback'>{errors.capacity}</div>}
          </div>
          <div className="row">
            <div className="col">
              <button type="submit" className='btn btn-primary btn-block'>Create</button>
            </div>
            <div className="col">
              <button type="button" className='btn btn-secondary btn-block' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
      )
    
}
