# 🔥 Guía de Migración a Firebase

## 📋 Índice
1. [Configuración de Firebase Console](#1-configuración-de-firebase-console)
2. [Configurar Variables de Entorno](#2-configurar-variables-de-entorno)
3. [Deploy a Firebase Hosting](#3-deploy-a-firebase-hosting)
4. [Configurar DNS en Cloudflare](#4-configurar-dns-en-cloudflare)
5. [Verificación Final](#5-verificación-final)

---

## 1. Configuración de Firebase Console

### Paso 1.1: Crear Usuario Admin en Firebase Auth

1. Ve a: **https://console.firebase.google.com/project/serfibanc/authentication**
2. Click en **"Get started"** (si es la primera vez)
3. Click en **"Email/Password"** y **habilítalo**
4. Click en **"Add user"**
   - **Email:** `gcomercial.consultor@gmail.com`
   - **Password:** `123456789` (o la que prefieras)
5. Click en **"Add user"**

### Paso 1.2: Crear Base de Datos Firestore

1. Ve a: **https://console.firebase.google.com/project/serfibanc/firestore**
2. Click en **"Create database"**
3. Selecciona **"Start in production mode"** (las reglas ya están configuradas en `firestore.rules`)
4. Selecciona la región más cercana a Chile: **`southamerica-east1` (São Paulo)** o **`us-west1` (Oregon)**
5. Click en **"Enable"**

### Paso 1.3: Obtener Configuración de Firebase

1. Ve a: **https://console.firebase.google.com/project/serfibanc/settings/general**
2. Baja hasta **"Your apps"** > **"Web apps"**
3. Si no hay ninguna app, click en **"Add app"** (icono `</>`):
   - **App nickname:** `Serfibanc Website`
   - **No** marques "Firebase Hosting"
   - Click en **"Register app"**
4. Copia los valores de `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "serfibanc.firebaseapp.com",
  projectId: "serfibanc",
  storageBucket: "serfibanc.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

---

## 2. Configurar Variables de Entorno

### Para Desarrollo Local (`.env`)

Edita el archivo `.env` y descomenta estas líneas con los valores que copiaste:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=serfibanc.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=serfibanc
VITE_FIREBASE_STORAGE_BUCKET=serfibanc.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Para Producción (GitHub Actions o Manual)

Tendrás que configurar estas variables como **secrets** en GitHub o en el servicio donde hagas el deploy.

---

## 3. Deploy a Firebase Hosting

### Opción A: Deploy Manual (Primera vez)

```bash
# 1. Login en Firebase
firebase login

# 2. Build del proyecto
npm run build

# 3. Deploy
firebase deploy
```

### Opción B: Deploy Automático con GitHub Actions

Crea el archivo `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - master

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        env:
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_CONTACTO: ${{ secrets.VITE_EMAILJS_TEMPLATE_CONTACTO }}
          VITE_EMAILJS_TEMPLATE_SIMULACION: ${{ secrets.VITE_EMAILJS_TEMPLATE_SIMULACION }}
          VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
        run: npm run build
        
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: serfibanc
```

---

## 4. Configurar DNS en Cloudflare

### Paso 4.1: Conectar Dominio Personalizado en Firebase

1. Ve a: **https://console.firebase.google.com/project/serfibanc/hosting**
2. Click en **"Add custom domain"**
3. Ingresa: **`serfibanc.cl`**
4. Firebase te mostrará los registros DNS que debes configurar

### Paso 4.2: Configurar en Cloudflare

1. Ve a **Cloudflare Dashboard** > **DNS**
2. **ELIMINA** los registros actuales que apuntan a AWS Amplify
3. **AGREGA** los registros que Firebase te indica:

#### Ejemplo de registros (los valores exactos los verás en Firebase):

**Para el dominio raíz (`serfibanc.cl`):**
```
Type: A
Name: @
Content: 151.101.1.195
Proxy: ✅ (naranja)
```

```
Type: A
Name: @
Content: 151.101.65.195
Proxy: ✅ (naranja)
```

**Para www (`www.serfibanc.cl`):**
```
Type: CNAME
Name: www
Content: serfibanc.cl
Proxy: ✅ (naranja)
```

### Paso 4.3: Verificar Dominio en Firebase

1. Después de configurar los DNS, vuelve a Firebase
2. Click en **"Verify"**
3. Firebase verificará que los DNS apuntan correctamente
4. Una vez verificado, click en **"Finish"**

⚠️ **Nota:** La propagación de DNS puede tardar hasta 24-48 horas, pero normalmente es más rápido (15-30 minutos).

---

## 5. Verificación Final

### 5.1: Probar Autenticación

1. Ve a **https://serfibanc.cl/admin**
2. Login con:
   - Email: `gcomercial.consultor@gmail.com`
   - Password: `123456789`
3. Debería ingresar correctamente

### 5.2: Probar Configuración de Tasas

1. Ve a **https://serfibanc.cl/admin/tasas**
2. Cambia las tasas (ej: Automotriz a 1.5%)
3. Click en **"Guardar Cambios"**
4. Verifica en Firestore Console que se guardó

### 5.3: Probar Simuladores

1. Abre en **otra ventana** (simula otro usuario): **https://serfibanc.cl/credito-automotriz**
2. Verifica que muestra la tasa configurada (1.5%)
3. Los cambios deben verse **en tiempo real** en todas las pestañas abiertas

### 5.4: Ver Logs en Consola (Opcional)

1. Abre DevTools (`F12`)
2. Verás logs como:
   ```
   ✅ Firebase inicializado correctamente
   📥 [Automotriz] Cargando tasas desde Firestore...
   ✅ [Automotriz] Tasas obtenidas: {pyme: 1.2, hipotecario: 0.8, automotriz: 1.5}
   ```

---

## 🎉 ¡Listo!

Tu sitio ahora está completamente migrado a Firebase con:
- ✅ Hosting en Firebase
- ✅ Base de datos Firestore con tasas centralizadas
- ✅ Autenticación con Firebase Auth
- ✅ Actualizaciones en tiempo real
- ✅ Reglas de seguridad configuradas
- ✅ Dominio personalizado con SSL

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Revisa los logs de Firebase Console
3. Verifica que todas las variables de entorno estén configuradas
4. Verifica que el usuario admin exista en Firebase Auth

