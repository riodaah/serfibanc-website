# 🚀 GUÍA DE DESPLIEGUE EN AWS AMPLIFY - SERFIBANC

## 📋 PASOS COMPLETOS PARA SUBIR A AMPLIFY

### PASO 1: Crear Repositorio en GitHub

#### Opción A: Desde GitHub Web (Más Fácil)

1. **Ve a GitHub:**
   - Abre https://github.com
   - Haz login con tu cuenta

2. **Crear Nuevo Repositorio:**
   - Clic en el botón "+" (arriba derecha)
   - Selecciona "New repository"
   
3. **Configurar el repositorio:**
   ```
   Repository name: serfibanc-website
   Description: Sitio web de Serfibanc - Asesoría Financiera
   Visibilidad: Public (o Private si prefieres)
   ❌ NO marcar "Initialize with README"
   ❌ NO agregar .gitignore
   ❌ NO agregar license
   ```

4. **Crear repository**
   - Clic en "Create repository"
   - **NO CIERRES** esta página, necesitarás la URL

5. **Copiar la URL del repositorio:**
   - Verás algo como: `https://github.com/TU-USUARIO/serfibanc-website.git`
   - **Copia esta URL**

#### Opción B: Desde GitHub CLI (Si lo tienes instalado)

```bash
gh repo create serfibanc-website --public --source=. --remote=origin
```

---

### PASO 2: Conectar el Proyecto con GitHub

Ejecuta estos comandos en la terminal (reemplaza TU-USUARIO con tu usuario de GitHub):

```bash
# Ver estado actual
git status

# Si hay cambios pendientes, agrégalos:
git add .
git commit -m "feat: Sitio web Serfibanc completo y optimizado"

# Conectar con GitHub (USA LA URL QUE COPIASTE)
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git

# Verificar que se agregó
git remote -v

# Subir a GitHub
git push -u origin master
```

**Ejemplo completo:**
```bash
git remote add origin https://github.com/damor/serfibanc-website.git
git push -u origin master
```

---

### PASO 3: Configurar AWS Amplify

#### 1. Acceder a AWS Amplify

- Ve a: https://console.aws.amazon.com/amplify/
- Haz login con tu cuenta de AWS
- Si no tienes cuenta AWS, créala en: https://aws.amazon.com

#### 2. Crear Nueva App

- Clic en **"New app"** → **"Host web app"**
- Selecciona **"GitHub"** como proveedor

#### 3. Autorizar GitHub

- Clic en **"Connect to GitHub"**
- Se abrirá ventana de autorización
- Acepta los permisos

#### 4. Seleccionar Repositorio

- Busca: `serfibanc-website`
- Selecciona el repositorio
- Branch: `master`
- Clic en **"Next"**

#### 5. Configurar Build Settings

Amplify debería detectar automáticamente que es Vite. Verifica que tenga:

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

**Si no lo detecta, pega esta configuración manualmente.**

#### 6. Advanced Settings (Opcional pero recomendado)

Agregar variables de entorno si es necesario:
- `NODE_VERSION`: `18`
- Otras variables según tu configuración

#### 7. Deploy

- Clic en **"Next"**
- Revisa la configuración
- Clic en **"Save and deploy"**

---

### PASO 4: Esperar el Despliegue

El proceso tomará entre 3-5 minutos:

1. **Provision** (30s) - Preparar servidor
2. **Build** (2-3 min) - Compilar el proyecto
3. **Deploy** (1 min) - Subir archivos
4. **Verify** (30s) - Verificación final

---

### PASO 5: Configurar Dominio Personalizado (Opcional)

#### Si tienes dominio (ej: serfibanc.cl):

1. En Amplify, ve a **"Domain management"**
2. Clic en **"Add domain"**
3. Ingresa tu dominio: `serfibanc.cl`
4. Amplify te dará registros DNS
5. Agrégalos en tu proveedor de dominio:
   ```
   Tipo: CNAME
   Nombre: www
   Valor: [valor que te da Amplify]
   
   Tipo: A o ALIAS
   Nombre: @
   Valor: [valor que te da Amplify]
   ```
6. Espera propagación (5-30 minutos)

---

## 🔧 CONFIGURACIÓN ADICIONAL PARA AMPLIFY

### 1. Crear archivo de configuración de Amplify (Ya incluido)

Ya tenemos `.gitignore` que excluye node_modules y dist.

### 2. Verificar que funcione localmente

Antes de desplegar, prueba el build local:

```bash
npm run build
npm run preview
```

Si abre correctamente en http://localhost:4173, está listo para Amplify.

---

## 📝 COMANDOS COMPLETOS (COPIA Y PEGA)

### 1. Verificar estado:
```bash
git status
git log --oneline -5
```

### 2. Si hay cambios pendientes:
```bash
git add .
git commit -m "feat: Sitio web Serfibanc listo para producción"
```

### 3. Crear repo en GitHub (si aún no existe):
Ve a: https://github.com/new

### 4. Conectar y subir:
```bash
# Reemplaza TU-USUARIO con tu usuario real de GitHub
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git

# Subir a GitHub
git push -u origin master

# Si da error de autenticación, usa:
git push -u origin master --force
```

### 5. Si ya existe el remote:
```bash
git push origin master
```

---

## ⚠️ POSIBLES PROBLEMAS Y SOLUCIONES

### Problema 1: "remote origin already exists"
```bash
# Ver remotes actuales
git remote -v

# Eliminar remote
git remote remove origin

# Agregar de nuevo
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git
```

### Problema 2: Error de autenticación en push
```bash
# Usar token personal de GitHub
# 1. Ve a GitHub → Settings → Developer settings → Personal access tokens
# 2. Genera un token con permisos de repo
# 3. Úsalo como contraseña al hacer push
```

### Problema 3: Build falla en Amplify
**Revisa:**
- Versión de Node (debe ser 18+)
- Comando de build: `npm run build`
- Carpeta de output: `dist`

**Solución:**
En Amplify → Build settings → Editar:
```yaml
build:
  commands:
    - npm run build
artifacts:
  baseDirectory: dist
```

---

## 🎯 CONFIGURACIÓN ESPECÍFICA PARA VITE EN AMPLIFY

Amplify a veces necesita configuración extra para Vite. Si tienes problemas:

### Opción 1: Agregar script en package.json (Ya está)
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

### Opción 2: Variables de entorno en Amplify
En Amplify Console → Environment variables:
```
NODE_VERSION = 18
CI = false
```

---

## 📦 ESTRUCTURA PARA AMPLIFY

```
Tu Repo en GitHub
├── src/               → Código fuente
├── public/            → Archivos estáticos
├── Imagenes/          → Imágenes del sitio
├── package.json       → Dependencias
├── vite.config.js     → Configuración Vite
├── index.html         → Entry point
└── .gitignore         → Archivos ignorados

Amplify ejecutará:
npm install  →  npm run build  →  Publica carpeta dist/
```

---

## 🌐 DESPUÉS DEL DESPLIEGUE

Una vez que Amplify termine, tendrás:

### URL automática:
```
https://master.d1234abcdefg.amplifyapp.com
```

### Para dominio personalizado:
```
https://serfibanc.cl
https://www.serfibanc.cl
```

---

## ✅ CHECKLIST PRE-DESPLIEGUE

- [ ] `npm run build` funciona sin errores
- [ ] `npm run preview` muestra el sitio correctamente
- [ ] Todos los archivos están en Git
- [ ] Repositorio creado en GitHub
- [ ] Remote configurado
- [ ] Push a GitHub exitoso
- [ ] Cuenta de AWS lista
- [ ] Videos optimizados (no muy pesados)

---

## 🎬 PROCESO COMPLETO (RESUMEN)

```
1. GitHub:
   - Crear repositorio
   - Copiar URL

2. Terminal:
   - git remote add origin [URL]
   - git push -u origin master

3. AWS Amplify:
   - Conectar GitHub
   - Seleccionar repo
   - Configurar build (automático)
   - Deploy

4. Esperar 3-5 minutos

5. ¡Sitio en vivo! 🎉
```

---

## 📞 SIGUIENTE PASO INMEDIATO

**Para GitHub:**

1. **Crear repositorio en:** https://github.com/new
   - Nombre: `serfibanc-website`
   - Public
   - Sin README, sin .gitignore, sin license

2. **Copiar la URL que te da** (algo como):
   ```
   https://github.com/TU-USUARIO/serfibanc-website.git
   ```

3. **Ejecutar en terminal:**
   ```bash
   git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git
   git push -u origin master
   ```

**¿Quieres que te ayude a ejecutar estos comandos ahora?** 🚀








