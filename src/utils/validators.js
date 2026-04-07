export const validators = {
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),

  password: (val) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(val),

  name: (val) =>
    /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{2,50}$/.test(val),

  required: (val) => val && val.trim().length > 0,
  capacity: (val) => /^[1-9]\d*$/.test(val),
  phone: (val) => /^\+?\d{10,15}$/.test(val),
  coordinate: (val) => /^-?\d+(\.\d+)?$/.test(val),
  zipCode: (val) => /^\d{5}$/.test(val),
};