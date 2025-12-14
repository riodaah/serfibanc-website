# 👥 Usuarios Administradores

## 📊 Estado Actual: ✅ Funcionando con localStorage

El sistema de autenticación ahora funciona en **modo híbrido**:
- ✅ **Funciona AHORA** con localStorage (sin necesidad de Firebase)
- 🔄 **Migrará automáticamente** a Firebase cuando lo configures

---

## 🔐 Cuentas Admin Configuradas

Puedes iniciar sesión con cualquiera de estas cuentas:

### Admin 1:
- **Email:** `gcomercial.consultor@gmail.com`
- **Password:** `123456789`

### Admin 2:
- **Email:** `da.morande@gmail.com`
- **Password:** `123456789`

---

## 🚀 Cómo Funciona Ahora

### **Modo Actual: localStorage**
- ✅ Login funciona inmediatamente
- ✅ No requiere configuración adicional
- ✅ Los datos se guardan en el navegador
- ⚠️ Las credenciales están en el código (solo para desarrollo)

### **Cuando configures Firebase:**
1. El sistema detectará automáticamente que Firebase está disponible
2. Intentará login con Firebase primero
3. Si el usuario no existe en Firebase, usará localStorage como fallback
4. Podrás migrar los usuarios a Firebase Authentication

---

## 📝 Migrar a Firebase Authentication (Opcional)

Cuando estés listo para usar Firebase:

### Paso 1: Habilitar Email/Password en Firebase

1. Ve a: **https://console.firebase.google.com/project/serfibanc/authentication**
2. Click en **"Get started"**
3. Click en **"Email/Password"** > **Enable** > **Save**

### Paso 2: Crear los Usuarios Admin

**Opción A: Desde Firebase Console (Manual)**

1. En Firebase Authentication, click en **"Add user"**
2. Para cada admin:
   - Email: `gcomercial.consultor@gmail.com`
   - Password: `123456789`
   - Click **"Add user"**
3. Repetir para `da.morande@gmail.com`

**Opción B: Con Firebase CLI (Automático)**

```bash
# Crear usuario 1
firebase auth:import usuarios.json --project serfibanc

# O manualmente uno por uno:
firebase auth:hash:bcrypt usuarios.csv --project serfibanc
```

### Paso 3: Probar

1. **Cierra sesión** en el admin
2. **Recarga** la página (`Ctrl + Shift + R`)
3. **Inicia sesión** nuevamente
4. En la consola verás: `✅ Login exitoso con Firebase: ...`

---

## 🔍 Cómo Saber Qué Modo Estás Usando

Abre la consola del navegador (F12) al hacer login:

**Si ves:**
- `✅ Login exitoso con Firebase:` → Estás usando Firebase
- `✅ Login exitoso con autenticación local` → Estás usando localStorage

---

## 🔒 Seguridad

### Modo localStorage (Actual):
- ⚠️ Las credenciales están hardcoded en el código
- ✅ Solo para desarrollo/testing
- ⚠️ No usar en producción a largo plazo

### Modo Firebase (Recomendado para producción):
- ✅ Contraseñas hasheadas y seguras
- ✅ Recuperación de contraseña funcional
- ✅ Protección contra fuerza bruta
- ✅ Logs de actividad de usuarios
- ✅ Autenticación de dos factores disponible

---

## 🎯 Recomendación

**Para desarrollo inmediato:** Usa el sistema actual (localStorage)

**Para producción:** Migra a Firebase siguiendo los pasos del `FIREBASE_SETUP.md`

---

## ❓ Preguntas Frecuentes

**¿Puedo agregar más usuarios?**
Sí, edita el archivo `src/context/AuthContext.jsx` y agrega más emails al array `USUARIOS_AUTORIZADOS`.

**¿Puedo cambiar las contraseñas?**
Sí, modifica el campo `password` en el mismo archivo.

**¿Los usuarios de localStorage se migran automáticamente a Firebase?**
No, debes crearlos manualmente en Firebase Console. Una vez creados, el sistema usará Firebase automáticamente.

**¿Qué pasa si olvido configurar Firebase?**
No pasa nada, el sistema seguirá funcionando con localStorage indefinidamente.


