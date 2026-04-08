import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook de conveniencia para acceder al contexto de autenticación.
 * Ahora consume el estado global compartido por el AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};
