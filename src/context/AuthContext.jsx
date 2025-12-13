import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail 
} from 'firebase/auth';

const AuthContext = createContext(null);

// Email autorizado para acceder al admin
const ADMIN_EMAIL = 'gcomercial.consultor@gmail.com';

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Escuchar cambios de autenticación de Firebase
  useEffect(() => {
    if (!auth) {
      console.warn('⚠️ Firebase Auth no disponible');
      setCargando(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email === ADMIN_EMAIL) {
        console.log('✅ Usuario autenticado:', firebaseUser.email);
        const datosUsuario = {
          email: firebaseUser.email,
          nombre: 'Administrador',
          rol: 'admin',
          uid: firebaseUser.uid
        };
        setUsuario(datosUsuario);
        localStorage.setItem('serfibanc_admin_user', JSON.stringify(datosUsuario));
      } else {
        setUsuario(null);
        localStorage.removeItem('serfibanc_admin_user');
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  // Función de login con Firebase Auth
  const login = async (email, password) => {
    if (!auth) {
      console.error('❌ Firebase Auth no disponible');
      return { success: false, error: 'Servicio de autenticación no disponible' };
    }

    try {
      // Verificar que sea el email autorizado
      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return { success: false, error: 'No tienes permisos para acceder al panel de administración' };
      }

      console.log('🔐 Intentando login con Firebase Auth...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Login exitoso:', userCredential.user.email);
      return { success: true };
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      let mensajeError = 'Credenciales incorrectas';
      
      switch (error.code) {
        case 'auth/user-not-found':
          mensajeError = 'Usuario no encontrado. Contacta al administrador del sistema.';
          break;
        case 'auth/wrong-password':
          mensajeError = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          mensajeError = 'Email inválido';
          break;
        case 'auth/user-disabled':
          mensajeError = 'Esta cuenta ha sido deshabilitada';
          break;
        case 'auth/too-many-requests':
          mensajeError = 'Demasiados intentos fallidos. Intenta más tarde.';
          break;
        case 'auth/network-request-failed':
          mensajeError = 'Error de conexión. Verifica tu internet.';
          break;
        default:
          mensajeError = 'Error al iniciar sesión. Intenta nuevamente.';
      }
      
      return { success: false, error: mensajeError };
    }
  };

  // Función de logout con Firebase Auth
  const logout = async () => {
    if (!auth) {
      console.error('❌ Firebase Auth no disponible');
      return;
    }

    try {
      await signOut(auth);
      console.log('✅ Logout exitoso');
      setUsuario(null);
      localStorage.removeItem('serfibanc_admin_user');
    } catch (error) {
      console.error('❌ Error en logout:', error);
    }
  };

  // Función para recuperar contraseña con Firebase Auth
  const recuperarPassword = async (email) => {
    if (!auth) {
      console.error('❌ Firebase Auth no disponible');
      return { 
        success: false, 
        error: 'Servicio de recuperación no disponible' 
      };
    }

    try {
      // Verificar que sea el email autorizado
      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return { 
          success: false, 
          error: 'No existe una cuenta asociada a este email.' 
        };
      }

      console.log(`📧 Enviando email de recuperación a: ${email}`);
      await sendPasswordResetEmail(auth, email);
      
      return { 
        success: true, 
        message: 'Se ha enviado un email con instrucciones para recuperar tu contraseña.' 
      };
    } catch (error) {
      console.error('❌ Error en recuperación de contraseña:', error);
      
      let mensajeError = 'Error al enviar el email de recuperación';
      
      switch (error.code) {
        case 'auth/user-not-found':
          mensajeError = 'No existe una cuenta asociada a este email.';
          break;
        case 'auth/invalid-email':
          mensajeError = 'Email inválido';
          break;
        case 'auth/too-many-requests':
          mensajeError = 'Demasiados intentos. Intenta más tarde.';
          break;
        default:
          mensajeError = 'Error al enviar el email. Intenta nuevamente.';
      }
      
      return { 
        success: false, 
        error: mensajeError 
      };
    }
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







