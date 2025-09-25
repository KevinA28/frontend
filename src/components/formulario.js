import React, { useState, useEffect } from 'react';

const Formulario = ({ alumnoSeleccionado, onGuardado }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (alumnoSeleccionado) {
      setNombre(alumnoSeleccionado.nombre);
      setEdad(alumnoSeleccionado.edad);
      setEmail(alumnoSeleccionado.email);
    } else {
      setNombre('');
      setEdad('');
      setEmail('');
    }
  }, [alumnoSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardado({
      nombre,
      edad: Number(edad),
      email,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">
        {alumnoSeleccionado ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default Formulario;
