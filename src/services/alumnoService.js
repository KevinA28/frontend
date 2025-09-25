const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/alumnos`;

/**
 * Obtiene la lista de alumnos desde el backend
 * @returns {Promise} Respuesta con lista de alumnos
 */
export async function obtenerAlumnos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los alumnos');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Crea un nuevo alumno
 * @param {Object} alumno Datos del alumno a crear
 * @returns {Promise} Respuesta con el alumno creado
 */
export async function crearAlumno(alumno) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno),
    });
    if (!response.ok) {
      throw new Error('Error al crear el alumno');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Edita un alumno existente
 * @param {number|string} id ID del alumno a editar
 * @param {Object} alumno Datos actualizados del alumno
 * @returns {Promise} Respuesta con el alumno actualizado
 */
export async function editarAlumno(id, alumno) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno),
    });
    if (!response.ok) {
      throw new Error('Error al editar el alumno');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Elimina un alumno por ID
 * @param {number|string} id ID del alumno a eliminar
 * @returns {Promise} Respuesta con mensaje de éxito o error
 */
export async function eliminarAlumno(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el alumno');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
