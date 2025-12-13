# 🌐 URLs de Serfibanc - Firebase

## ✅ URLs de Firebase (GCP - Para Pruebas)

### Frontend (Firebase Hosting):
- **https://serfibanc-f6cc6.web.app** ← URL principal de prueba
- **https://serfibanc-f6cc6.firebaseapp.com** ← URL alternativa

### Panel Admin:
- **https://serfibanc-f6cc6.web.app/admin** ← Login
- **https://serfibanc-f6cc6.web.app/admin/tasas** ← Configuración de tasas

### Simuladores:
- **https://serfibanc-f6cc6.web.app/credito-pyme**
- **https://serfibanc-f6cc6.web.app/credito-hipotecario**
- **https://serfibanc-f6cc6.web.app/credito-automotriz**

---

## 🔑 Credenciales de Admin

### Usuario 1:
- Email: `gcomercial.consultor@gmail.com`
- Password: `123456789`

### Usuario 2:
- Email: `da.morande@gmail.com`
- Password: `123456789`

---

## 🗄️ Base de Datos

### Firestore Console:
- **https://console.firebase.google.com/project/serfibanc-f6cc6/firestore**

### Estructura:
```
configuracion/
  └── tasas_interes
      ├── pyme: 1.2
      ├── hipotecario: 0.8
      ├── automotriz: 1.2
      ├── actualizadoPor: "email@ejemplo.com"
      └── fechaActualizacion: "timestamp"
```

---

## 🔐 Authentication

### Firebase Authentication Console:
- **https://console.firebase.google.com/project/serfibanc-f6cc6/authentication/users**

---

## 📊 Firebase Console (General):
- **https://console.firebase.google.com/project/serfibanc-f6cc6/overview**

---

## 🧪 Cómo Probar

### 1. Probar Login:
```
1. Abre: https://serfibanc-f6cc6.web.app/admin
2. Login con: gcomercial.consultor@gmail.com / 123456789
3. Deberías entrar al panel admin
```

### 2. Probar Configuración de Tasas:
```
1. Ve a: https://serfibanc-f6cc6.web.app/admin/tasas
2. Cambia la tasa de Automotriz (ej: 1.5%)
3. Click "Guardar Cambios"
4. Abre Firestore Console y verifica que se guardó
```

### 3. Probar Simulador en Tiempo Real:
```
1. Abre: https://serfibanc-f6cc6.web.app/credito-automotriz
2. En OTRA VENTANA: https://serfibanc-f6cc6.web.app/admin/tasas
3. Cambia la tasa en el admin
4. La tasa en el simulador se actualizará AUTOMÁTICAMENTE (tiempo real)
```

### 4. Verificar Consola del Navegador (F12):
```
Deberías ver:
✅ Firebase inicializado correctamente
✅ Firestore conectado
🔥 [Firestore] Suscrito a cambios de tasas
```

---

## 🌍 URL Actual (AWS Amplify - Producción)

- **https://serfibanc.cl** ← Aún apunta a AWS

### Para migrar DNS a Firebase:

1. **En Firebase Console:**
   - Ve a: https://console.firebase.google.com/project/serfibanc-f6cc6/hosting
   - Click "Add custom domain"
   - Ingresa: `serfibanc.cl`
   - Firebase te dará registros DNS

2. **En Cloudflare:**
   - Elimina registros que apuntan a AWS Amplify
   - Agrega registros que Firebase te indicó
   - Espera 15-30 minutos

---

## 🔄 Comandos Útiles

### Ver proyecto actual:
```bash
firebase projects:list
```

### Cambiar de proyecto:
```bash
firebase use serfibanc-f6cc6
```

### Ver logs de hosting:
```bash
firebase hosting:sites:list
```

### Re-deploy rápido:
```bash
npm run build && firebase deploy --only hosting
```

### Deploy solo reglas:
```bash
firebase deploy --only firestore:rules
```

---

## 📱 Verificación Rápida

- [ ] Login funciona en `/admin`
- [ ] Tasas se guardan en Firestore
- [ ] Simuladores muestran tasas de Firestore
- [ ] Cambios se reflejan en tiempo real
- [ ] Emails funcionan (EmailJS)
- [ ] Sitio responsive (mobile)
- [ ] SSL activado (HTTPS)

---

## 🆘 Si algo falla

### Error 404 en Firebase:
- Verifica que `firebase.json` tenga la regla de rewrite
- Re-deploy: `firebase deploy --only hosting`

### Tasas no se actualizan:
- Verifica Firestore Console
- Revisa consola del navegador (F12)
- Verifica que las reglas de Firestore estén desplegadas

### Login no funciona:
- Verifica que los usuarios estén creados en Firebase Auth
- Revisa credenciales en `.env`
- Verifica que las variables empiecen con `VITE_`

---

## ✅ Estado Actual

- ✅ Frontend desplegado en Firebase Hosting
- ✅ Base de datos en Firestore
- ✅ Authentication con Firebase Auth
- ✅ Tasas dinámicas centralizadas
- ✅ Actualizaciones en tiempo real
- ✅ 2 usuarios admin creados
- ✅ Reglas de seguridad desplegadas
- ✅ SSL incluido
- ✅ CDN global de Google

---

**Última actualización:** 13 de diciembre, 2024
**Project ID:** serfibanc-f6cc6
**Region:** southamerica-east1 (São Paulo, Brasil)

