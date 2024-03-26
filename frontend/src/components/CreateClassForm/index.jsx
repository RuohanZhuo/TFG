import React, { useState } from 'react';
import axios from 'axios';
import './index.css';


export default function CreateClass(props) {
    const [state, setState] = useState({
        classroomName: '',
        studentCapacity: '',
        errorCreateClass: ''
    });

    const { classroomName, studentCapacity, errorCreateClass } = state;

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/classrooms', { classroomName, studentCapacity });
            alert('Clase creada exitosamente');
            // Aquí podrías redirigir a otra página o hacer otras acciones después de guardar los datos
        } catch (error) {
            alert('Error al crear la clase');
            console.error(error);
        }
    };

    const changeHandle = (type) => (event) => {
        setState({ ...state, [type]: event.target.value });
    };

    return (
        <form  onSubmit={onSubmit}>
            <div classroomName="form-group">
                <h1 classroomName="text-left mb-4">Crear clase</h1>
                <div classroomName="input-group">
                    <label htmlFor="classroomName">Nombre de la Clase:</label>
                    <input
                        type="text"
                        id="classroomName"
                        value={classroomName}
                        onChange={changeHandle('classroomName')}
                        required
                    />
                </div>
                <div classroomName="input-group">
                    <label htmlFor="studentCapacity">Capacidad de Estudiantes:</label>
                    <input
                        type="number"
                        id="studentCapacity"
                        value={studentCapacity}
                        onChange={changeHandle('studentCapacity')}
                        required
                    />
                </div>
            </div>
            <button type="submit" classroomName="btn btn-primary btn-block">Crear</button>
        </form>
    );
}


