import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Classroom from '../Classroom';

export default function ClassroomList() {
  const token = localStorage.getItem('token');

  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/classroom', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setItems(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleSelect = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const deleteSelectedClassrooms = async () => {
    if (window.confirm('Are you sure you want to delete the selected classrooms?')) {
      try {
        await Promise.all(
          selectedItems.map((id) =>
            axios.delete(`http://localhost:3001/classroom/${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          )
        );
        setItems(items.filter((item) => !selectedItems.includes(item._id)));
        setSelectedItems([]);
        setIsEditing(false);
      } catch (error) {
        console.error('Error al eliminar las aulas:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && (
          <button onClick={deleteSelectedClassrooms}>Confirm</button>
        )}
      </div>
      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-4">
            <Classroom
              {...item}
              isEditing={isEditing}
              isSelected={selectedItems.includes(item._id)}
              onSelect={handleSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
