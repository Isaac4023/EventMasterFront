/**
 * Validadores globales de datos mediante RegEx.
 * Cumple con los requisitos técnicos de validación estricta.
 */
export const validators = {
  /**
   * Valida email estándar.
   */
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  /**
   * Valida contraseña: Min 6 caracteres, al menos una letra y un número.
   */
  password: (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
  },

  /**
   * Valida nombre: Solo letras y espacios, min 2 caracteres.
   */
  name: (name) => {
    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return re.test(name);
  },

  /**
   * Valida teléfono: Entre 8 y 15 dígitos numéricos.
   */
  phone: (phone) => {
    const re = /^\d{8,15}$/;
    return re.test(phone);
  }
};
