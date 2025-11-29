# 🚀 PASOS PARA SUBIR A GITHUB Y AMPLIFY

## ✅ Estado Actual

Tu proyecto ya está listo en Git local:
- ✅ Repositorio inicializado
- ✅ 2 commits realizados
- ✅ Archivos en staging
- ⏳ Falta: Subir a GitHub

---

## 📝 PASO 1: CREAR REPOSITORIO EN GITHUB

### Ir a GitHub:
1. Abre tu navegador
2. Ve a: **https://github.com/new**
3. Login si no lo estás

### Configurar el repositorio:
```
Repository name:     serfibanc-website
Description:         Sitio web Serfibanc - Asesoría Financiera y Simuladores de Crédito
Visibilidad:         ✅ Public (o Private si prefieres)

❌ NO marcar "Add a README file"
❌ NO seleccionar ".gitignore"
❌ NO seleccionar "Choose a license"

Estos ya están en tu proyecto local
```

### Crear:
4. Clic en **"Create repository"**

### Copiar URL:
5. Verás una página con instrucciones
6. **Copia la URL HTTPS**, algo como:
   ```
   https://github.com/TU-USUARIO/serfibanc-website.git
   ```

---

## 📝 PASO 2: CONECTAR Y SUBIR A GITHUB

### Una vez que tengas la URL, ejecuta estos comandos:

```bash
# Conectar con GitHub (reemplaza con TU URL)
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git

# Verificar que se agregó correctamente
git remote -v

# Subir todo a GitHub
git push -u origin master
```

### Ejemplo real (reemplaza TU-USUARIO):
```bash
git remote add origin https://github.com/damor/serfibanc-website.git
git push -u origin master
```

---

## 📝 PASO 3: CONFIGURAR AWS AMPLIFY

### 1. Acceder a Amplify:
- Ve a: https://console.aws.amazon.com/amplify/
- Login con tu cuenta AWS
- Si no tienes cuenta: https://aws.amazon.com/free/

### 2. Crear nueva app:
- Clic en **"Create new app"**
- Selecciona **"Host web app"**
- Clic en **"Get started"**

### 3. Conectar con GitHub:
- Selecciona **"GitHub"**
- Clic en **"Continue"**
- Autoriza a Amplify a acceder a tus repos
- **Selecciona:** `serfibanc-website`
- **Branch:** `master`
- Clic en **"Next"**

### 4. Configurar Build:

Amplify detectará automáticamente Vite. **Verifica que tenga:**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**Si está correcto:** Clic en **"Next"**

### 5. Revisar y Deploy:
- Revisa toda la configuración
- Clic en **"Save and deploy"**

### 6. Esperar despliegue (3-5 minutos):
Verás 4 fases:
- ⏳ Provision (30s)
- ⏳ Build (2-3 min)
- ⏳ Deploy (1 min)
- ⏳ Verify (30s)

### 7. ¡Sitio en vivo!
Al terminar, tendrás una URL como:
```
https://master.d1a2b3c4d5e6f.amplifyapp.com
```

---

## 🌐 CONFIGURAR DOMINIO PERSONALIZADO

### Si tienes serfibanc.cl:

1. En Amplify → **"Domain management"**
2. Clic en **"Add domain"**
3. Ingresa: `serfibanc.cl`
4. Amplify te dará registros DNS
5. Agrégalos en tu proveedor de dominio (NIC Chile, GoDaddy, etc.)

**Registros típicos:**
```
Tipo: CNAME
Host: www
Valor: [valor de Amplify]

Tipo: ALIAS o A
Host: @
Valor: [valor de Amplify]
```

6. Espera propagación (5-30 min)
7. ¡Listo! Tu sitio estará en serfibanc.cl

---

## 🔄 ACTUALIZACIONES FUTURAS

Cada vez que hagas cambios:

```bash
# 1. Hacer cambios en el código
# 2. Agregar y hacer commit
git add .
git commit -m "descripción de cambios"

# 3. Subir a GitHub
git push origin master

# 4. Amplify desplegará automáticamente (2-3 min)
```

---

## ⚙️ CONFIGURACIÓN RECOMENDADA EN AMPLIFY

### Variables de entorno:
```
NODE_VERSION = 18
CI = false
```

### Reglas de redirección (para React Router):
```
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json|webp|mp4)$)([^.]+$)/>
Target: /index.html
Status: 200 (Rewrite)
```

Esto asegura que las rutas de React Router funcionen correctamente.

---

## 📊 RESUMEN DEL PROCESO

```
Código Local (tu PC)
        ↓
    Git commit
        ↓
    Git push
        ↓
GitHub (repositorio)
        ↓
AWS Amplify (detecta cambios)
        ↓
    Build automático
        ↓
Sitio en vivo 🎉
```

---

## 🎯 COMANDOS QUE VAS A EJECUTAR AHORA

### Después de crear el repo en GitHub:

```bash
# 1. Conectar (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git

# 2. Verificar
git remote -v

# 3. Subir
git push -u origin master
```

---

## ✅ CHECKLIST FINAL

- [ ] Crear repositorio en GitHub
- [ ] Copiar URL del repositorio
- [ ] Ejecutar `git remote add origin [URL]`
- [ ] Ejecutar `git push -u origin master`
- [ ] Acceder a AWS Amplify
- [ ] Conectar con GitHub
- [ ] Seleccionar repositorio
- [ ] Configurar build settings
- [ ] Deploy
- [ ] Esperar 3-5 minutos
- [ ] ¡Sitio en vivo!

---

## 🎉 BENEFICIOS DE AMPLIFY

- ✅ **Deploy automático** cada vez que haces push
- ✅ **HTTPS gratis** con certificado SSL
- ✅ **CDN global** (carga rápida en todo el mundo)
- ✅ **Escalable** automáticamente
- ✅ **Dominio personalizado** gratis
- ✅ **Preview de branches** (para probar cambios)
- ✅ **Monitoreo** de tráfico y errores

---

**¿Listo para crear el repositorio en GitHub?**

Ve a: **https://github.com/new** y sígueme avisando! 🚀


