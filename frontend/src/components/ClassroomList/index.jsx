import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Classroom from '../Classroom';

export default function ClassroomList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/classroom');
        setItems(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {items.map(item => (
          <div key={item._id} className="col-md-4">
            <Classroom {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
