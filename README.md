# Serfibanc - Sitio Web de Asesoría Financiera

Sitio web moderno y profesional para Serfibanc SpA, asesores financieros especializados en gestión de créditos PYME, Hipotecarios y Automotrices.

## 🚀 Características

- ✅ Diseño moderno y responsivo
- ✅ Animaciones suaves con Framer Motion
- ✅ Simuladores de crédito interactivos
- ✅ Tres tipos de crédito: PYME, Hipotecario y Automotriz
- ✅ Formularios de contacto y simulación
- ✅ Integración preparada para backend (Make.com o API custom)
- ✅ SEO optimizado
- ✅ Paleta de colores corporativa (azules)

## 📁 Estructura del Proyecto

```
serfibanc-website/
├── src/
│   ├── assets/              # Imágenes y recursos
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── PasosSimulacion.jsx
│   │   ├── ProductosCredito.jsx
│   │   ├── ServiciosEspeciales.jsx
│   │   ├── BloqueConfianza.jsx
│   │   ├── QuienesSomos.jsx
│   │   ├── Contacto.jsx
│   │   ├── SimuladorCredito.jsx
│   │   ├── SimulacionResumenModal.jsx
│   │   └── SeccionSimuladores.jsx
│   ├── pages/               # Páginas principales
│   │   ├── Home.jsx
│   │   ├── CreditoPyme.jsx
│   │   ├── CreditoHipotecario.jsx
│   │   └── CreditoAutomotriz.jsx
│   ├── services/            # Servicios y APIs
│   │   └── simulacionApi.js
│   ├── styles/              # Estilos globales
│   │   └── globals.css
│   ├── config.json          # Configuración del sitio
│   ├── App.jsx
│   └── main.jsx
├── public/
├── Imagenes/                # Imágenes originales
├── Referencias/             # Imágenes de referencia del diseño
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones fluidas
- **React Router** - Navegación SPA

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

3. Para compilar para producción:
```bash
npm run build
```

4. Para previsualizar la build de producción:
```bash
npm run preview
```

## ⚙️ Configuración

### `src/config.json`

Archivo de configuración central donde puedes modificar:

- **Datos de contacto**: teléfono, email, WhatsApp, redes sociales
- **Límites de simulación**: montos mínimos/máximos, cuotas, tasa de interés
- **Configuración de productos**: descripción de cada tipo de crédito

```json
{
  "contacto": {
    "whatsapp": "+56967270575",
    "email": "contacto@serfibanc.cl",
    ...
  },
  "simulacion": {
    "montoMin": 5000000,
    "montoMax": 200000000,
    ...
  }
}
```

### Colores y Estilos

Los colores principales se configuran en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    dark: '#0B2447',
    medium: '#1F4690',
    light: '#5C7CFA',
  }
}
```

## 🔌 Integración con Backend

### Envío de Simulaciones

El archivo `src/services/simulacionApi.js` contiene la función `enviarSimulacion()` que actualmente hace un `console.log` de los datos. 

**Para integrar con tu backend:**

1. Reemplaza el código placeholder con un fetch real:

```javascript
export const enviarSimulacion = async (datos) => {
  const response = await fetch('https://tu-backend.com/api/simulacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  return response.json();
};
```

2. **O integra con Make.com:**
   - Crea un webhook en Make.com
   - Reemplaza la URL con la del webhook
   - Los datos se enviarán automáticamente

### Datos que se envían en la simulación:

```javascript
{
  nombre: "Juan Pérez",
  email: "juan@ejemplo.cl",
  telefono: "+56912345678",
  tipoCredito: "PYME",
  monto: 50000000,
  cuotas: 36,
  tasaInteres: 1.2,
  cuotaMensual: 1500000,
  ingresoMensual: 5000000,
  antiguedad: "si",
  fecha: "2024-01-01T00:00:00.000Z"
}
```

## 📱 Responsive Design

El sitio está completamente optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Personalización

### Cambiar imágenes

Reemplaza las imágenes en la carpeta `Imagenes/`:
- `logo.webp` - Logo de la empresa
- `Credito-empresa.webp` - Imagen para crédito PYME
- `Creditos-Hipotecarios.webp` - Imagen para crédito hipotecario
- `Credito-automotriz.webp` - Imagen para crédito automotriz
- `Negocios.webp` - Imagen de equipo/oficina

### Modificar textos

Los textos están directamente en los componentes para facilitar su edición. Busca en:
- `src/components/` para secciones del home
- `src/pages/` para contenido de las páginas de productos

## 📧 Formularios de Contacto

El sitio incluye dos formularios:

1. **Formulario de contacto general** (`src/components/Contacto.jsx`)
2. **Modal de simulación** (`src/components/SimulacionResumenModal.jsx`)

Ambos están preparados para enviar datos a un backend. Configura la URL en `simulacionApi.js`.

## 🚀 Despliegue

### Opción 1: Netlify / Vercel

1. Conecta tu repositorio
2. Comando de build: `npm run build`
3. Carpeta de publicación: `dist`

### Opción 2: Hosting tradicional

1. Ejecuta `npm run build`
2. Sube el contenido de la carpeta `dist/` a tu servidor
3. Configura el servidor para SPA (redirect a index.html)

## 📄 Licencia

© 2024 Serfibanc SpA. Todos los derechos reservados.

## 🤝 Soporte

Para consultas sobre el desarrollo del sitio, contacta al equipo de desarrollo.

Para consultas sobre servicios financieros, contacta:
- 📞 +56967270575
- 📧 contacto@serfibanc.cl
- 💬 WhatsApp: [Chatear](https://wa.me/56967270575)

---

**Desarrollado con ❤️ para Serfibanc SpA**


