# 📋 INSTRUCCIONES DE INSTALACIÓN Y USO - SERFIBANC

## 🚀 INICIO RÁPIDO

### 1. Instalar Node.js
Si no tienes Node.js instalado:
- Descarga desde: https://nodejs.org/ (versión LTS recomendada)
- Verifica la instalación:
```bash
node --version
npm --version
```

### 2. Instalar Dependencias
Abre la terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```
Esto descargará todas las bibliotecas necesarias (~5 minutos la primera vez).

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
El sitio se abrirá automáticamente en tu navegador en `http://localhost:3000`

## 📝 CONFIGURACIÓN BÁSICA

### Cambiar Datos de Contacto

Edita el archivo `src/config.json`:

```json
{
  "contacto": {
    "whatsapp": "+56967270575",        ← Cambiar por tu número
    "email": "contacto@serfibanc.cl",  ← Cambiar por tu email
    "telefono": "+56967270575",
    "instagram": "@serfibanc",         ← Tu usuario de Instagram
    "facebook": "@serfibanc"           ← Tu usuario de Facebook
  }
}
```

### Cambiar Parámetros de Simulación

En el mismo archivo `src/config.json`:

```json
{
  "simulacion": {
    "montoMin": 5000000,              ← Monto mínimo en CLP
    "montoMax": 200000000,            ← Monto máximo en CLP
    "maxCuotas": 60,                  ← Máximo de cuotas
    "tasaInteresPorDefecto": 1.2,    ← Tasa mensual (%)
    "opcionesMonto": [                ← Opciones en el simulador
      5000000,
      10000000,
      20000000,
      ...
    ],
    "opcionesCuotas": [12, 24, 36, 48, 60]
  }
}
```

### Cambiar Imágenes

Reemplaza las imágenes en la carpeta `Imagenes/`:

| Archivo | Uso | Tamaño Recomendado |
|---------|-----|-------------------|
| `logo.webp` | Logo del sitio | 200x200px |
| `Credito-empresa.webp` | Página Crédito PYME | 800x600px |
| `Creditos-Hipotecarios.webp` | Página Crédito Hipotecario | 800x600px |
| `Credito-automotriz.webp` | Página Crédito Automotriz | 800x600px |
| `Negocios.webp` | Sección "Quiénes Somos" | 800x600px |

**Importante:** Mantén los mismos nombres de archivo o actualiza las referencias en los componentes.

## 🔌 INTEGRAR CON BACKEND (Enviar correos)

### Opción 1: Integrar con Make.com (Recomendado - Sin programación)

1. Ve a https://make.com y crea una cuenta
2. Crea un nuevo escenario con un webhook
3. Copia la URL del webhook
4. Edita el archivo `src/services/simulacionApi.js`:

```javascript
export const enviarSimulacion = async (datos) => {
  const response = await fetch('TU-WEBHOOK-URL-DE-MAKE', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  return response.json();
};
```

5. En Make, configura módulos para:
   - Enviar email al cliente
   - Enviar email al administrador
   - Guardar en Google Sheets / Airtable (opcional)

### Opción 2: Integrar con tu propio Backend

Si tienes tu propia API, reemplaza la función en `src/services/simulacionApi.js`:

```javascript
export const enviarSimulacion = async (datos) => {
  const response = await fetch('https://tu-api.com/simulaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer TU_TOKEN'  // Si usas autenticación
    },
    body: JSON.stringify(datos),
  });
  
  if (!response.ok) {
    throw new Error('Error al enviar simulación');
  }
  
  return response.json();
};
```

### Estructura de datos que se envían:

```javascript
{
  // Datos de contacto del cliente
  nombre: "Juan Pérez",
  email: "juan@ejemplo.cl",
  telefono: "+56912345678",
  
  // Datos de la simulación
  tipoCredito: "PYME",           // "PYME", "Hipotecario" o "Automotriz"
  monto: 50000000,
  cuotas: 36,
  tasaInteres: 1.2,
  cuotaMensual: 1500000,        // Calculado automáticamente
  ingresoMensual: 5000000,
  antiguedad: "si",
  
  // Metadata
  fecha: "2024-01-01T00:00:00.000Z",
  emailAdmin: "admin@serfibanc.cl"
}
```

## 🎨 PERSONALIZAR COLORES

Edita el archivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    dark: '#0B2447',      ← Azul oscuro principal
    medium: '#1F4690',    ← Azul medio
    light: '#5C7CFA',     ← Azul claro / acentos
  }
}
```

Luego reinicia el servidor de desarrollo (`Ctrl+C` y `npm run dev`).

## 📝 EDITAR TEXTOS

### Página Principal (Home)

Los textos del home están en estos archivos:

- `src/components/Hero.jsx` - Texto principal del hero
- `src/components/QuienesSomos.jsx` - Sección "Quiénes Somos"
- `src/components/PasosSimulacion.jsx` - Pasos de simulación
- `src/components/ServiciosEspeciales.jsx` - Servicios adicionales
- `src/components/BloqueConfianza.jsx` - Bloque de confianza

### Páginas de Productos

- `src/pages/CreditoPyme.jsx` - Página de Crédito PYME
- `src/pages/CreditoHipotecario.jsx` - Página de Crédito Hipotecario
- `src/pages/CreditoAutomotriz.jsx` - Página de Crédito Automotriz

Simplemente abre el archivo en un editor de texto y modifica los textos.

## 🌐 PUBLICAR EN INTERNET

### Opción 1: Netlify (Gratis y Fácil)

1. Ve a https://netlify.com y crea una cuenta
2. Arrastra la carpeta `dist` (después de hacer `npm run build`)
3. ¡Listo! Tendrás una URL como `serfibanc.netlify.app`
4. Puedes configurar tu dominio personalizado en los ajustes

### Opción 2: Vercel (Gratis y Fácil)

1. Ve a https://vercel.com y crea una cuenta
2. Conecta tu repositorio de Git o sube la carpeta
3. Vercel detectará automáticamente que es Vite
4. ¡Despliega!

### Opción 3: Hosting Tradicional (cPanel, etc.)

1. Ejecuta en la terminal:
```bash
npm run build
```

2. Esto creará una carpeta `dist/` con todos los archivos

3. Sube TODO el contenido de la carpeta `dist/` a tu servidor

4. **Importante:** Configura el servidor para que todas las rutas apunten a `index.html`:

**Para Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Para Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 🐛 SOLUCIÓN DE PROBLEMAS

### El servidor no inicia
```bash
# Borra node_modules y reinstala
rmdir /s node_modules  (Windows)
rm -rf node_modules    (Mac/Linux)
npm install
```

### Las imágenes no se ven
- Verifica que las imágenes estén en la carpeta `Imagenes/`
- Verifica que los nombres coincidan exactamente (mayúsculas/minúsculas)
- Limpia la caché del navegador (Ctrl+Shift+R)

### Error al compilar
- Verifica que tengas Node.js versión 18 o superior: `node --version`
- Actualiza las dependencias: `npm update`

### Los formularios no envían datos
- Revisa la consola del navegador (F12)
- Verifica que hayas configurado correctamente `simulacionApi.js`
- Asegúrate de que tu webhook/API esté funcionando

## 📞 COMANDOS ÚTILES

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ver qué proceso usa el puerto 3000 (si está ocupado)
netstat -ano | findstr :3000

# Instalar una nueva dependencia
npm install nombre-paquete
```

## ✅ CHECKLIST ANTES DE PUBLICAR

- [ ] Cambié los datos de contacto en `config.json`
- [ ] Reemplacé todas las imágenes con las de mi marca
- [ ] Configuré la integración de emails (Make.com o backend)
- [ ] Probé todos los simuladores
- [ ] Probé el formulario de contacto
- [ ] Verifiqué que se vea bien en móvil
- [ ] Ejecuté `npm run build` sin errores
- [ ] Probé la versión compilada con `npm run preview`

## 🆘 SOPORTE

Si tienes problemas técnicos:

1. Revisa este documento completo
2. Busca el error en Google
3. Revisa la consola del navegador (F12) para ver errores
4. Contacta al desarrollador que te entregó este proyecto

---

**¡Éxito con tu nuevo sitio web! 🚀**

