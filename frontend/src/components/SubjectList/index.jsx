import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Subject from '../Subject';

export default function SubjectList() {

    const token = localStorage.getItem('token');

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/subject/professor`,{
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
    }, []);

    return (
        <div className="container">
            <div className="row">
                {items.map(item => (
                    <div key={item._id} className="col-md-4">
                        <Subject {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
