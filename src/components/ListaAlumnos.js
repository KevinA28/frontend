import React, { useEffect, useState } from 'react';
import { obtenerAlumnos } from '../services/alumnoService';

function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerAlumnos()
      .then((data) => {
        setAlumnos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando alumnos...</p>;
  if (error) return <p>Error al cargar los alumnos: {error}</p>;

  return (
    <div>
      <h2>Lista de Alumnos</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.id}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlumnos;
