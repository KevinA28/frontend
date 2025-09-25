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
