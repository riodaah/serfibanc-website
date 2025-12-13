# 🔥 Setup Final de Firebase - Paso a Paso

## ⏱️ Tiempo Total: 15-20 minutos

---

## ✅ PASO 1: Configurar Firebase Console (5 min)

### 1.1: Entrar a Firebase Console

Ve a: **https://console.firebase.google.com/**

- Si no existe el proyecto "serfibanc", créalo:
  1. Click **"Add project"**
  2. Nombre: **serfibanc**
  3. Desactiva Google Analytics
  4. Click **"Create project"**

### 1.2: Habilitar Authentication

URL: **https://console.firebase.google.com/project/serfibanc/authentication**

1. Click **"Get started"**
2. Click **"Email/Password"**
3. **Enable** (activar)
4. Click **"Save"**

### 1.3: Crear 2 Usuarios Admin

En la pestaña **"Users"** > Click **"Add user"**:

**Usuario 1:**
- Email: `gcomercial.consultor@gmail.com`
- Password: `123456789`
- Click **"Add user"**

**Usuario 2:**
- Email: `da.morande@gmail.com`
- Password: `123456789`
- Click **"Add user"**

### 1.4: Crear Base de Datos Firestore

URL: **https://console.firebase.google.com/project/serfibanc/firestore**

1. Click **"Create database"**
2. Selecciona **"Start in production mode"**
3. Región: **`southamerica-east1` (São Paulo)** ← Más cerca de Chile
4. Click **"Enable"**
5. Espera ~30 segundos a que se cree

### 1.5: Obtener Credenciales

URL: **https://console.firebase.google.com/project/serfibanc/settings/general**

1. Baja hasta **"Your apps"**
2. Si no hay ninguna app web:
   - Click en **`</>`** (ícono Web)
   - Nickname: **serfibanc-web**
   - **NO** marques "Firebase Hosting"
   - Click **"Register app"**

3. Verás algo como:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "serfibanc.firebaseapp.com",
     projectId: "serfibanc",
     storageBucket: "serfibanc.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abc123def456"
   };
   ```

4. **COPIA** estos valores

---

## ✅ PASO 2: Configurar Variables de Entorno (2 min)

### 2.1: Editar archivo .env

Abre el archivo `.env` en el proyecto y pega los valores:

```env
# EmailJS Configuration (ya está configurado)
VITE_EMAILJS_SERVICE_ID=service_wqvmzyf
VITE_EMAILJS_TEMPLATE_CONTACTO=template_dngn8zq
VITE_EMAILJS_TEMPLATE_SIMULACION=template_k0x8u1l
VITE_EMAILJS_PUBLIC_KEY=OFz1TMi_ztMJJ5xUJ

# Firebase Configuration (PEGA TUS VALORES AQUÍ)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=serfibanc.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=serfibanc
VITE_FIREBASE_STORAGE_BUCKET=serfibanc.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

**GUARDA** el archivo.

---

## ✅ PASO 3: Login en Firebase CLI (1 min)

Abre una terminal PowerShell en el proyecto:

```powershell
cd "C:\Users\damor\Desktop\Serfibanc 2.0"

# Login en Firebase
firebase login
```

Se abrirá el navegador:
1. Selecciona tu cuenta de Google
2. Autoriza Firebase CLI
3. Vuelve a la terminal

---

## ✅ PASO 4: Deploy Reglas de Firestore (1 min)

En la misma terminal:

```powershell
# Deploy solo las reglas de Firestore
firebase deploy --only firestore:rules
```

Deberías ver:
```
✔ Deploy complete!
```

---

## ✅ PASO 5: Build y Deploy a Firebase Hosting (5 min)

### 5.1: Build del proyecto

```powershell
npm run build
```

Espera a que termine (~1-2 minutos).

### 5.2: Deploy a Firebase Hosting

```powershell
firebase deploy --only hosting
```

Deberías ver:
```
✔ Deploy complete!

Hosting URL: https://serfibanc.web.app
```

---

## 🌐 URLS DE PRUEBA

Después del deploy, tu sitio estará disponible en:

### URLs de Firebase (para pruebas):
- **https://serfibanc.web.app** ← URL principal
- **https://serfibanc.firebaseapp.com** ← URL alternativa

### URL actual (AWS Amplify):
- **https://serfibanc.cl** ← Aún apunta a AWS

---

## ✅ PASO 6: Probar en Firebase Hosting

### 6.1: Abrir el sitio en Firebase

Abre: **https://serfibanc.web.app**

### 6.2: Probar Login

1. Ve a: **https://serfibanc.web.app/admin**
2. Login con:
   - Email: `gcomercial.consultor@gmail.com`
   - Password: `123456789`

3. **Abre la consola** (F12) y verás:
   ```
   ✅ Firebase inicializado correctamente
   🔐 Intentando login con Firebase Auth...
   ✅ Login exitoso con Firebase: gcomercial.consultor@gmail.com
   ```

### 6.3: Probar Configuración de Tasas

1. Ve a: **https://serfibanc.web.app/admin/tasas**
2. Cambia las tasas (ej: Automotriz a **1.5%**)
3. Click **"Guardar Cambios"**
4. En la consola verás:
   ```
   💾 [Firestore] Guardando tasas: {pyme: 1.2, hipotecario: 0.8, automotriz: 1.5}
   ✅ [Firestore] Tasas guardadas exitosamente
   ```

### 6.4: Verificar en Firestore Console

Ve a: **https://console.firebase.google.com/project/serfibanc/firestore/data**

Deberías ver:
```
configuracion/
  └── tasas_interes
      ├── pyme: 1.2
      ├── hipotecario: 0.8
      ├── automotriz: 1.5
      ├── actualizadoPor: "gcomercial.consultor@gmail.com"
      └── fechaActualizacion: "2024-12-13..."
```

### 6.5: Probar Simulador

1. Abre en **OTRA VENTANA**: **https://serfibanc.web.app/credito-automotriz**
2. Verifica que muestra **1.5% mensual**
3. Vuelve al admin, cambia la tasa a **1.8%**
4. Guarda
5. **La otra ventana se actualizará automáticamente** (tiempo real) 🔥

---

## 🎉 ¡Listo! Firebase Completamente Configurado

Ahora tienes:
- ✅ Authentication funcionando
- ✅ Firestore con tasas centralizadas
- ✅ Hosting en Firebase
- ✅ Actualizaciones en tiempo real
- ✅ SSL incluido
- ✅ CDN global

---

## 📍 Siguiente Paso: Migrar DNS a Firebase

Cuando estés listo para apuntar **serfibanc.cl** a Firebase:

### En Firebase Console:

1. Ve a: **https://console.firebase.google.com/project/serfibanc/hosting**
2. Click **"Add custom domain"**
3. Ingresa: **serfibanc.cl**
4. Firebase te mostrará los registros DNS

### En Cloudflare:

1. **ELIMINA** los registros que apuntan a AWS Amplify
2. **AGREGA** los registros que Firebase te indicó (algo como):
   ```
   Type: A
   Name: @
   Content: 151.101.1.195
   
   Type: A
   Name: @
   Content: 151.101.65.195
   ```

3. Espera 15-30 minutos (propagación DNS)
4. Verifica en Firebase que el dominio esté conectado

---

## 🆘 Si algo falla

### Error: "Project not found"
```powershell
# Verifica que estás en el proyecto correcto
firebase use serfibanc
```

### Error: "Permission denied"
```powershell
# Re-login
firebase logout
firebase login
```

### Error en build
```powershell
# Limpia y reinstala
rm -rf node_modules dist
npm install
npm run build
```

---

## 📞 Verificación Final

Ejecuta estos comandos para verificar:

```powershell
# Ver proyecto actual
firebase projects:list

# Ver lo que está deployado
firebase hosting:sites:list

# Ver logs
firebase deploy --only hosting --debug
```

---

¡Ya está todo configurado! 🎉

