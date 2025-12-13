-- Crear tabla para configuración de tasas de interés
-- Ejecutar este SQL en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS configuracion_tasas (
  id BIGSERIAL PRIMARY KEY,
  tasa_pyme DECIMAL(5,2) NOT NULL DEFAULT 1.2,
  tasa_hipotecario DECIMAL(5,2) NOT NULL DEFAULT 0.8,
  tasa_automotriz DECIMAL(5,2) NOT NULL DEFAULT 1.0,
  actualizado_por VARCHAR(100),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar valores iniciales
INSERT INTO configuracion_tasas (tasa_pyme, tasa_hipotecario, tasa_automotriz, actualizado_por)
VALUES (1.2, 0.8, 1.0, 'sistema')
ON CONFLICT DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE configuracion_tasas ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos (público)
CREATE POLICY "Permitir lectura pública"
ON configuracion_tasas
FOR SELECT
TO public
USING (true);

-- Política para permitir escritura solo a usuarios autenticados (admin)
CREATE POLICY "Permitir actualización a admin"
ON configuracion_tasas
FOR UPDATE
TO authenticated
USING (true);

-- Política para permitir inserción a usuarios autenticados
CREATE POLICY "Permitir inserción a admin"
ON configuracion_tasas
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Comentarios
COMMENT ON TABLE configuracion_tasas IS 'Configuración de tasas de interés para simuladores de crédito';
COMMENT ON COLUMN configuracion_tasas.tasa_pyme IS 'Tasa mensual para crédito PYME (%)';
COMMENT ON COLUMN configuracion_tasas.tasa_hipotecario IS 'Tasa anual para crédito hipotecario (%)';
COMMENT ON COLUMN configuracion_tasas.tasa_automotriz IS 'Tasa mensual para crédito automotriz (%)';

