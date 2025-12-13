import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail 
} from 'firebase/auth';

const AuthContext = createContext(null);

// Usuarios autorizados (fallback mientras Firebase no esté configurado)
const USUARIOS_AUTORIZADOS = [
  {
    email: 'gcomercial.consultor@gmail.com',
    password: '123456789',
    nombre: 'Administrador',
    rol: 'admin'
  },
  {
    email: 'da.morande@gmail.com',
    password: '123456789',
    nombre: 'Administrador',
    rol: 'admin'
  }
];

// Verificar si un email está autorizado
const esEmailAutorizado = (email) => {
  return USUARIOS_AUTORIZADOS.some(u => u.email.toLowerCase() === email.toLowerCase());
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Escuchar cambios de autenticación (Firebase o localStorage)
  useEffect(() => {
    // Si Firebase está disponible, usarlo
    if (auth) {
      console.log('✅ Usando Firebase Auth');
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser && esEmailAutorizado(firebaseUser.email)) {
          console.log('✅ Usuario autenticado con Firebase:', firebaseUser.email);
          const datosUsuario = {
            email: firebaseUser.email,
            nombre: 'Administrador',
            rol: 'admin',
            uid: firebaseUser.uid,
            provider: 'firebase'
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
    } else {
      // Fallback: usar localStorage
      console.warn('⚠️ Firebase no disponible, usando autenticación local');
      const usuarioGuardado = localStorage.getItem('serfibanc_admin_user');
      if (usuarioGuardado) {
        try {
          const datosUsuario = JSON.parse(usuarioGuardado);
          if (esEmailAutorizado(datosUsuario.email)) {
            setUsuario(datosUsuario);
          } else {
            localStorage.removeItem('serfibanc_admin_user');
          }
        } catch (e) {
          localStorage.removeItem('serfibanc_admin_user');
        }
      }
      setCargando(false);
    }
  }, []);

  // Función de login (Firebase o localStorage)
  const login = async (email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Si Firebase está disponible, intentar con Firebase primero
    if (auth) {
      try {
        // Verificar que sea un email autorizado
        if (!esEmailAutorizado(email)) {
          return { success: false, error: 'No tienes permisos para acceder al panel de administración' };
        }

        console.log('🔐 Intentando login con Firebase Auth...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        console.log('✅ Login exitoso con Firebase:', userCredential.user.email);
        return { success: true };
      } catch (error) {
        console.error('❌ Error en login Firebase:', error);
        
        // Si el error es usuario no encontrado, intentar con fallback local
        if (error.code === 'auth/user-not-found') {
          console.log('⚠️ Usuario no encontrado en Firebase, intentando con credenciales locales...');
          return loginLocal(email, password);
        }
        
        let mensajeError = 'Credenciales incorrectas';
        
        switch (error.code) {
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
    } else {
      // Firebase no disponible, usar autenticación local
      console.log('⚠️ Firebase no disponible, usando autenticación local');
      return loginLocal(email, password);
    }
  };

  // Login local (fallback)
  const loginLocal = (email, password) => {
    const usuarioEncontrado = USUARIOS_AUTORIZADOS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (usuarioEncontrado) {
      const datosUsuario = {
        email: usuarioEncontrado.email,
        nombre: usuarioEncontrado.nombre,
        rol: usuarioEncontrado.rol,
        provider: 'local',
        loginTime: new Date().toISOString()
      };
      setUsuario(datosUsuario);
      localStorage.setItem('serfibanc_admin_user', JSON.stringify(datosUsuario));
      console.log('✅ Login exitoso con autenticación local');
      return { success: true };
    }

    return { success: false, error: 'Credenciales incorrectas' };
  };

  // Función de logout (Firebase o local)
  const logout = async () => {
    if (auth && usuario?.provider === 'firebase') {
      try {
        await signOut(auth);
        console.log('✅ Logout exitoso de Firebase');
      } catch (error) {
        console.error('❌ Error en logout Firebase:', error);
      }
    } else {
      console.log('✅ Logout exitoso local');
    }
    
    setUsuario(null);
    localStorage.removeItem('serfibanc_admin_user');
  };

  // Función para recuperar contraseña
  const recuperarPassword = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Verificar que sea un email autorizado
    if (!esEmailAutorizado(email)) {
      return { 
        success: false, 
        error: 'No existe una cuenta asociada a este email.' 
      };
    }

    // Si Firebase está disponible, usarlo
    if (auth) {
      try {
        console.log(`📧 Enviando email de recuperación vía Firebase a: ${email}`);
        await sendPasswordResetEmail(auth, email);
        
        return { 
          success: true, 
          message: 'Se ha enviado un email con instrucciones para recuperar tu contraseña.' 
        };
      } catch (error) {
        console.error('❌ Error en recuperación de contraseña Firebase:', error);
        
        // Si el usuario no existe en Firebase, mostrar mensaje genérico
        if (error.code === 'auth/user-not-found') {
          return {
            success: true,
            message: 'Si existe una cuenta con este email, recibirás instrucciones para recuperar tu contraseña. Contacta al administrador si no recibes el email.'
          };
        }
        
        let mensajeError = 'Error al enviar el email de recuperación';
        
        switch (error.code) {
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
    } else {
      // Firebase no disponible, mensaje informativo
      console.log('⚠️ Firebase no disponible para recuperación de contraseña');
      return { 
        success: true, 
        message: 'Para recuperar tu contraseña, contacta al administrador del sistema.' 
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







