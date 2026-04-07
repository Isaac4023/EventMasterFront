export const validators = {
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),

  password: (val) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(val),

  name: (val) =>
    /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{2,50}$/.test(val),

  required: (val) => val && val.trim().length > 0,
};