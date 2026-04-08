/**
 * @typedef {Object} User
 * @property {string} _id - Identificador único de usuario.
 * @property {string} name - Nombre completo del usuario.
 * @property {string} email - Correo electrónico institucional.
 * @property {'user'|'admin'|'organizer'|'staff'|'artist'} role - Rol del usuario en la plataforma.
 * @property {string} [avatar] - URL de la imagen de perfil.
 */

/**
 * @typedef {Object} Event
 * @property {string} _id - ID del evento.
 * @property {string} title - Nombre del evento.
 * @property {string} description - Detalles del evento.
 * @property {string} date - Fecha en formato ISO string.
 * @property {string} location - Nombre del lugar o recinto.
 * @property {string} category - Categoría (Concierto, Deporte, etc).
 * @property {number} price - Precio base del boleto.
 * @property {string} imageUrl - URL de la imagen principal.
 * @property {Object} [organizer] - Datos del organizador.
 * @property {string} [organizer.name]
 * @property {string} [status] - 'upcoming', 'ongoing', 'completed', 'cancelled'.
 */

/**
 * @typedef {Object} Place
 * @property {string} _id - ID del recinto.
 * @property {string} name - Nombre de la sede.
 * @property {string} address - Dirección completa.
 * @property {number} capacity - Aforo máximo.
 * @property {Object} coordinates - Ubicación GPS.
 * @property {number} coordinates.latitude
 * @property {number} coordinates.longitude
 * @property {string} [imageUrl]
 */

/**
 * @typedef {Object} Reservation
 * @property {string} _id - ID de la reserva.
 * @property {User|string} user - Datos del usuario o ID.
 * @property {Event|string} event - Datos del evento o ID.
 * @property {string} purchaseDate - Fecha de compra.
 * @property {string} status - 'confirmed', 'cancelled', 'used'.
 * @property {string} ticketCode - Código QR o ID para escaneo.
 */

// Este archivo no exporta lógica, solo definiciones estructurales para JSDoc.
export default {};
