import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://tgctfxffdwcwcirzprgv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY no está configurada');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Servicio de tasas
export const tasasService = {
  /**
   * Obtener las tasas de interés actuales
   * @returns {Promise<{pyme: number, hipotecario: number, automotriz: number}>}
   */
  async obtenerTasas() {
    try {
      const { data, error } = await supabase
        .from('configuracion_tasas')
        .select('*')
        .single();

      if (error) {
        console.error('Error obteniendo tasas:', error);
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
        return false;
      }

      console.log('✅ [Supabase] Tasas guardadas exitosamente');
      return true;
    } catch (e) {
      console.error('❌ [Supabase] Error en actualizarTasas:', e);
      return false;
    }
  }
};

