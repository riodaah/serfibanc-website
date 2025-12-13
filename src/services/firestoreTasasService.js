import { db } from '../config/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

/**
 * Servicio para gestionar las tasas de interés en Firestore
 * Colección: configuracion
 * Documento: tasas_interes
 */

const COLLECTION = 'configuracion';
const DOC_ID = 'tasas_interes';

export const firestoreTasasService = {
  /**
   * Obtener las tasas de interés desde Firestore
   * @returns {Promise<{pyme: number, hipotecario: number, automotriz: number}>}
   */
  async obtenerTasas() {
    if (!db) {
      console.warn('⚠️ Firestore no disponible, usando localStorage');
      return this._obtenerDesdeLocalStorage();
    }

    try {
      console.log('📥 [Firestore] Obteniendo tasas...');
      const docRef = doc(db, COLLECTION, DOC_ID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('✅ [Firestore] Tasas obtenidas:', data);
        
        // Guardar en localStorage como caché
        localStorage.setItem('serfibanc_tasas', JSON.stringify(data));
        
        return {
          pyme: data.pyme || 1.2,
          hipotecario: data.hipotecario || 0.8,
          automotriz: data.automotriz || 1.0
        };
      } else {
        console.log('📝 [Firestore] No existe documento, creando con valores por defecto...');
        const tasasPorDefecto = {
          pyme: 1.2,
          hipotecario: 0.8,
          automotriz: 1.0,
          actualizadoPor: 'sistema',
          fechaActualizacion: new Date().toISOString()
        };
        
        await setDoc(docRef, tasasPorDefecto);
        return tasasPorDefecto;
      }
    } catch (error) {
      console.error('❌ [Firestore] Error obteniendo tasas:', error);
      return this._obtenerDesdeLocalStorage();
    }
  },

  /**
   * Actualizar las tasas de interés en Firestore
   * @param {Object} tasas - {pyme: number, hipotecario: number, automotriz: number}
   * @param {string} usuario - Email del usuario que actualiza
   * @returns {Promise<boolean>}
   */
  async actualizarTasas(tasas, usuario = 'admin') {
    if (!db) {
      console.warn('⚠️ Firestore no disponible, guardando solo en localStorage');
      localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
      return true;
    }

    try {
      console.log('💾 [Firestore] Guardando tasas:', tasas);
      
      const docRef = doc(db, COLLECTION, DOC_ID);
      const dataToSave = {
        pyme: parseFloat(tasas.pyme) || 1.2,
        hipotecario: parseFloat(tasas.hipotecario) || 0.8,
        automotriz: parseFloat(tasas.automotriz) || 1.0,
        actualizadoPor: usuario,
        fechaActualizacion: new Date().toISOString()
      };

      await setDoc(docRef, dataToSave, { merge: true });
      
      console.log('✅ [Firestore] Tasas guardadas exitosamente');
      
      // También guardar en localStorage como caché
      localStorage.setItem('serfibanc_tasas', JSON.stringify(dataToSave));
      
      return true;
    } catch (error) {
      console.error('❌ [Firestore] Error guardando tasas:', error);
      
      // Fallback a localStorage
      console.log('🔄 Guardando en localStorage como respaldo');
      localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
      
      return false;
    }
  },

  /**
   * Suscribirse a cambios en tiempo real de las tasas
   * @param {Function} callback - Función a ejecutar cuando cambien las tasas
   * @returns {Function} Función para cancelar la suscripción
   */
  suscribirCambios(callback) {
    if (!db) {
      console.warn('⚠️ Firestore no disponible, no se puede suscribir a cambios');
      return () => {};
    }

    try {
      const docRef = doc(db, COLLECTION, DOC_ID);
      
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('🔄 [Firestore] Cambio detectado en tasas:', data);
          
          const tasas = {
            pyme: data.pyme || 1.2,
            hipotecario: data.hipotecario || 0.8,
            automotriz: data.automotriz || 1.0
          };
          
          // Actualizar localStorage
          localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
          
          // Llamar al callback
          callback(tasas);
        }
      }, (error) => {
        console.error('❌ [Firestore] Error en suscripción:', error);
      });

      return unsubscribe;
    } catch (error) {
      console.error('❌ [Firestore] Error al suscribirse:', error);
      return () => {};
    }
  },

  /**
   * Obtener tasas desde localStorage (fallback)
   * @private
   */
  _obtenerDesdeLocalStorage() {
    const tasasGuardadas = localStorage.getItem('serfibanc_tasas');
    if (tasasGuardadas) {
      try {
        return JSON.parse(tasasGuardadas);
      } catch (e) {
        console.error('Error parseando localStorage:', e);
      }
    }
    
    // Valores por defecto
    return {
      pyme: 1.2,
      hipotecario: 0.8,
      automotriz: 1.0
    };
  }
};

