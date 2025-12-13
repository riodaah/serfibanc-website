import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Usuarios autorizados (en producción esto vendría de Cognito/DynamoDB)
const USUARIOS_AUTORIZADOS = [
  {
    email: 'gcomercial.consultor@gmail.com',
    password: '123456789',
    nombre: 'Administrador',
    rol: 'admin'
  }
];

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('serfibanc_admin_user');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (e) {
        localStorage.removeItem('serfibanc_admin_user');
      }
    }
    setCargando(false);
  }, []);

  // Función de login
  const login = async (email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    const usuarioEncontrado = USUARIOS_AUTORIZADOS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (usuarioEncontrado) {
      const datosUsuario = {
        email: usuarioEncontrado.email,
        nombre: usuarioEncontrado.nombre,
        rol: usuarioEncontrado.rol,
        loginTime: new Date().toISOString()
      };
      setUsuario(datosUsuario);
      localStorage.setItem('serfibanc_admin_user', JSON.stringify(datosUsuario));
      return { success: true };
    }

    return { success: false, error: 'Credenciales incorrectas' };
  };

  // Función de logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('serfibanc_admin_user');
  };

  // Función para recuperar contraseña (simulada)
  const recuperarPassword = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const usuarioExiste = USUARIOS_AUTORIZADOS.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (usuarioExiste) {
      // En producción, esto enviaría un email real vía Cognito/SES
      console.log(`📧 Enviando email de recuperación a: ${email}`);
      return { 
        success: true, 
        message: 'Se ha enviado un email con instrucciones para recuperar tu contraseña.' 
      };
    }

    return { 
      success: false, 
      error: 'No existe una cuenta asociada a este email.' 
    };
  };

  const value = {
    usuario,
    cargando,
    login,
    logout,
    recuperarPassword,
    isAuthenticated: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;







