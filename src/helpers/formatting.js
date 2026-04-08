/**
 * Funciones auxiliares para formateo de datos (Fechas, Moneda, etc.)
 */
export const formatting = {
  /**
   * Formatea una fecha ISO a un formato legible (ej: "Lunes, 15 de Noviembre")
   */
  date: (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  },

  /**
   * Formatea un número a moneda (ej: "$2,500.00")
   */
  currency: (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  },

  /**
   * Capitaliza la primera letra de cada palabra
   */
  capitalize: (text) => {
    if (!text) return '';
    return text.replace(/\b\w/g, (l) => l.toUpperCase());
  }
};
