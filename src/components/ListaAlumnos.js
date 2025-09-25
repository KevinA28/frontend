import React, { useEffect, useState } from 'react';
import {
  obtenerAlumnos,
  crearAlumno,
  editarAlumno,
  eliminarAlumno,
} from '../services/alumnoService';

function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', edad: '', email: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = async () => {
    try {
      const data = await obtenerAlumnos();
      setAlumnos(data);
      setCargando(false);
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await editarAlumno(editandoId, formData);
        alert('Alumno actualizado');
      } else {
        await crearAlumno(formData);
        alert('Alumno creado');
      }
      setFormData({ nombre: '', edad: '', email: '' });
      setEditandoId(null);
      cargarAlumnos();
    } catch (err) {
      alert('Error al guardar alumno');
    }
  };

  const manejarEditar = (alumno) => {
    setFormData({
      nombre: alumno.nombre,
      edad: alumno.edad,
      email: alumno.email,
    });
    setEditandoId(alumno.id);
  };

  const manejarEliminar = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este alumno?')) {
      try {
        await eliminarAlumno(id);
        alert('Alumno eliminado');
        cargarAlumnos();
      } catch (err) {
        alert('Error al eliminar alumno');
      }
    }
  };

  if (cargando) return <p>Cargando alumnos...</p>;
  if (error) return <p>Error al cargar los alumnos: {error}</p>;

  return (
    <div>
      <h2>{editandoId ? 'Editar Alumno' : 'Nuevo Alumno'}</h2>
      <form onSubmit={manejarSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={manejarCambio}
          required
        />
        <button type="submit">
          {editandoId ? 'Actualizar Alumno' : 'Crear Alumno'}
        </button>
        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null);
              setFormData({ nombre: '', edad: '', email: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Lista de Alumnos</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.id}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.edad}</td>
              <td>{alumno.email}</td>
              <td>
                <button onClick={() => manejarEditar(alumno)}>Editar</button>{' '}
                <button onClick={() => manejarEliminar(alumno.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlumnos;
