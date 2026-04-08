/**
 * Utilidades de formateo para EventMaster.
 */

// FORMATEAR FECHA: ISO -> "24 Abr, 2026" o "Viernes, 24 de Abril"
export const formatDate = (dateString, type = 'short') => {
  if (!dateString) return 'Fecha TBD';
  const date = new Date(dateString);
  
  if (type === 'short') {
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  
  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

// FORMATEAR MONEDA: Number -> "$2,500 MXN"
export const formatCurrency = (amount) => {
  if (amount === 0) return 'Gratis';
  if (!amount) return 'N/A';
  
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
};

// CAPITALIZAR: "juan perez" -> "Juan Perez"
export const capitalize = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

// ABREVIAR NÚMEROS: 1500 -> "1.5k"
export const formatCompactNumber = (number) => {
  if (number < 1000) return number.toString();
  return (number / 1000).toFixed(1) + 'k';
};
