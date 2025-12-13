import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://tgctfxffdwcwcirzprgv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.warn('⚠️ VITE_SUPABASE_ANON_KEY no está configurada. Las tasas se cargarán desde localStorage.');
}

// Solo crear cliente si la key está disponible
export const supabase = supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Servicio de tasas
export const tasasService = {
  /**
   * Obtener las tasas de interés actuales
   * @returns {Promise<{pyme: number, hipotecario: number, automotriz: number}>}
   */
  async obtenerTasas() {
    // Si Supabase no está configurado, usar localStorage o valores por defecto
    if (!supabase) {
      console.warn('⚠️ Supabase no disponible, usando localStorage');
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

    try {
      const { data, error } = await supabase
        .from('configuracion_tasas')
        .select('*')
        .single();

      if (error) {
        console.error('Error obteniendo tasas desde Supabase:', error);
        // Fallback a localStorage
        const tasasGuardadas = localStorage.getItem('serfibanc_tasas');
        if (tasasGuardadas) {
          try {
            return JSON.parse(tasasGuardadas);
          } catch (e) {
            console.error('Error parseando localStorage:', e);
          }
        }
        // Valores por defecto si hay error
        return {
          pyme: 1.2,
          hipotecario: 0.8,
          automotriz: 1.0
        };
      }

      return {
        pyme: data.tasa_pyme,
        hipotecario: data.tasa_hipotecario,
        automotriz: data.tasa_automotriz
      };
    } catch (e) {
      console.error('Error en obtenerTasas:', e);
      // Fallback a localStorage
      const tasasGuardadas = localStorage.getItem('serfibanc_tasas');
      if (tasasGuardadas) {
        try {
          return JSON.parse(tasasGuardadas);
        } catch (e2) {
          console.error('Error parseando localStorage:', e2);
        }
      }
      return {
        pyme: 1.2,
        hipotecario: 0.8,
        automotriz: 1.0
      };
    }
  },

  /**
   * Actualizar las tasas de interés
   * @param {Object} tasas - {pyme: number, hipotecario: number, automotriz: number}
   * @returns {Promise<boolean>}
   */
  async actualizarTasas(tasas) {
    // Si Supabase no está configurado, solo guardar en localStorage
    if (!supabase) {
      console.warn('⚠️ Supabase no disponible, guardando solo en localStorage');
      localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
      return true;
    }

    try {
      console.log('💾 [Supabase] Guardando tasas:', tasas);

      // Primero verificamos si existe un registro
      const { data: existing, error: selectError } = await supabase
        .from('configuracion_tasas')
        .select('id')
        .single();

      let result;
      
      if (selectError && selectError.code === 'PGRST116') {
        // No existe, crear nuevo registro
        console.log('📝 [Supabase] Creando primer registro de tasas');
        result = await supabase
          .from('configuracion_tasas')
          .insert([{
            tasa_pyme: tasas.pyme,
            tasa_hipotecario: tasas.hipotecario,
            tasa_automotriz: tasas.automotriz,
            actualizado_por: 'admin',
            fecha_actualizacion: new Date().toISOString()
          }]);
      } else if (existing) {
        // Ya existe, actualizar
        console.log('✏️ [Supabase] Actualizando registro existente');
        result = await supabase
          .from('configuracion_tasas')
          .update({
            tasa_pyme: tasas.pyme,
            tasa_hipotecario: tasas.hipotecario,
            tasa_automotriz: tasas.automotriz,
            actualizado_por: 'admin',
            fecha_actualizacion: new Date().toISOString()
          })
          .eq('id', existing.id);
      }

      if (result.error) {
        console.error('❌ [Supabase] Error guardando:', result.error);
        // Fallback a localStorage si falla
        console.log('🔄 Guardando en localStorage como respaldo');
        localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
        return true;
      }

      console.log('✅ [Supabase] Tasas guardadas exitosamente');
      return true;
    } catch (e) {
      console.error('❌ [Supabase] Error en actualizarTasas:', e);
      // Fallback a localStorage si falla
      console.log('🔄 Guardando en localStorage como respaldo');
      localStorage.setItem('serfibanc_tasas', JSON.stringify(tasas));
      return true;
    }
  }
};

