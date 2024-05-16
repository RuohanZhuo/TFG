import React, { Component} from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios'; 
import './index.css';

export default class ClassroomTimetable extends Component {

  state = {
    timetableData: [],
    loading: true
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3001/timetable/classroom/${this.props.id}`, {  
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.setState({ timetableData: response.data.data, loading: false }); 
    } catch (error) {
      console.error('Error fetching classroom info:', error);
      this.setState({ loading: false }); 
    }
  }
  
  


  isHourOccupied(dayOfWeek,hour){
    const {timetableData} = this.state;
    if (!Array.isArray(timetableData)) return false;
    for (const entry of timetableData){
      console.log(entry)
      if(entry.dayOfWeek === dayOfWeek) {
        const startHour = new Date(entry.startTime).getHours();
        const endHour = new Date(entry.endTime).getHours();
        if (hour >= startHour && hour < endHour) {
          return entry.subject.acronym; // La hora está dentro del intervalo de inicio y fin, por lo tanto está ocupada
        }
      }
    }
    return false; // La hora no está ocupada
  }




  render() {
    const horas = [];
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horasInicio = 9;
    const horasFin = 21;
    // const columnas = diasSemana.length + 1; // Días de la semana + Hora
    const filas = 13; // Filas de la tabla
    const { timetableData, loading } = this.state;
    

    

    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      );
    }

    for (let i = horasInicio; i <= horasFin; i++) {
      horas.push(`${i}:00`);
    }


    const tabla = [];
    // Primera fila: días de la semana
    const primeraFila = [<th key="hora">Hora</th>];
    for (let i = 0; i < diasSemana.length; i++) {
      primeraFila.push(<th key={diasSemana[i]}>{diasSemana[i]}</th>);
    }
    tabla.push(<tr key="dias">{primeraFila}</tr>);
    
    // Resto de las filas
    for (let i = 0; i < filas-1; i++) {
      const fila = [];
      // Primera columna: horas
      fila.push(<td key={`hora-${i}`}>{horas[i]} - {horas[i+1]} </td>);
      
      // Celdas de los días de la semana
      for (let j = 0; j < diasSemana.length; j++) {
        const isOccupied = this.isHourOccupied(j + 1, horasInicio + i + 1); // Verifica si la hora está ocupada
        fila.push(
          <td key={`${diasSemana[j]}-${i}`} style={{ backgroundColor: isOccupied ? 'yellow' : 'white' }}>
            {isOccupied ? this.isHourOccupied(j + 1, horasInicio + i + 1) : ''}
          </td>
        );
      }
      
      // Agregar la fila a la tabla
      tabla.push(<tr key={`fila-${i}`}>{fila}</tr>);
    }


    if (timetableData) {
    return (
      <div>
         {/* <h2>Horario de {}</h2>   */}
        <div className="table-container">
          <table border="1">
            <tbody>
              {tabla}
            </tbody>
          </table>
        </div>
      </div>
    );
    }else {
      return (
        <div className="mt-5 text-center">
          <p>No se pudo obtener la información de la clase.</p>
        </div>
      );
    }
  }
}
