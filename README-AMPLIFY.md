# 🚀 Desplegar Serfibanc en AWS Amplify

## 📋 Pasos para Despliegue

### 1. Subir a GitHub (Completar primero)

Ejecuta estos comandos en la terminal:

```bash
# Ya ejecutado por el asistente:
git init
git add .
git commit -m "Initial commit - Serfibanc website"

# Debes ejecutar tú (después de crear el repo en GitHub):
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git
git branch -M main
git push -u origin main
```

### 2. Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `serfibanc-website`
3. Descripción: "Sitio web de Serfibanc - Asesoría Financiera"
4. Visibilidad: **Private** (recomendado) o Public
5. **NO** inicialices con README (ya lo tienes)
6. Clic en "Create repository"
7. Copia la URL que aparece (ej: https://github.com/TU-USUARIO/serfibanc-website.git)

### 3. Conectar Repositorio Local con GitHub

En la terminal del proyecto:

```bash
git remote add origin https://github.com/TU-USUARIO/serfibanc-website.git
git push -u origin main
```

### 4. Configurar AWS Amplify

#### Opción A: Desde la consola de AWS

1. Ve a https://console.aws.amazon.com/amplify/
2. Clic en "Get Started" → "Host web app"
3. Selecciona **GitHub**
4. Autoriza AWS Amplify a acceder a tu GitHub
5. Selecciona el repositorio: `serfibanc-website`
6. Rama: `main`
7. Clic "Next"

#### Configuración de Build:

Amplify detectará automáticamente que es un proyecto Vite. Verifica que tenga:

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

8. Clic "Next"
9. Revisa la configuración
10. Clic "Save and deploy"

#### Opción B: Con Amplify CLI (Avanzado)

```bash
# Instalar Amplify CLI (solo una vez)
npm install -g @aws-amplify/cli

# Configurar credenciales
amplify configure

# Inicializar Amplify en el proyecto
amplify init

# Agregar hosting
amplify add hosting

# Publicar
amplify publish
```

### 5. Configurar Dominio Personalizado (Opcional)

1. En la consola de Amplify, ve a tu aplicación
2. Menú lateral → "Domain management"
3. Clic "Add domain"
4. Ingresa: `serfibanc.cl`
5. Sigue las instrucciones para configurar DNS

---

## ⚙️ Configuración de Build para Amplify

### package.json (Ya configurado)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Build Settings en Amplify

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

### Variables de Entorno (Si las necesitas)

En Amplify Console:
1. App settings → Environment variables
2. Agregar variables si es necesario

---

## 🔧 Solución de Problemas

### Error: "Build failed"

Verifica en Amplify logs que:
- Node version sea 18+ (default en Amplify)
- Todas las dependencias se instalen correctamente
- El build local funcione: `npm run build`

### Error: "404 en rutas"

Amplify necesita redirecciones para SPA:

En Amplify Console:
1. App settings → Rewrites and redirects
2. Agregar regla:
```
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|mp4)$)([^.]+$)/>
Target: /index.html
Type: 200 (Rewrite)
```

O crea un archivo `public/_redirects`:
```
/*    /index.html   200
```

### Error: "Imágenes no cargan"

Verifica que las imágenes estén en la carpeta correcta y las rutas sean relativas.

---

## 📊 Después del Despliegue

### URL de tu sitio:

Amplify te dará una URL como:
```
https://main.d1234567890.amplifyapp.com
```

Puedes configurar un dominio personalizado después.

### CI/CD Automático

Cada vez que hagas `git push`:
1. Amplify detecta el cambio
2. Ejecuta `npm run build`
3. Despliega automáticamente
4. ¡Sitio actualizado!

---

## 🎯 Checklist Pre-Despliegue

- [x] Código funcional localmente
- [x] `npm run build` sin errores
- [x] Videos en la carpeta correcta
- [x] Imágenes optimizadas
- [x] Config.json con datos correctos
- [ ] Git inicializado
- [ ] Repo en GitHub creado
- [ ] Conectado con Amplify

---

## 📞 Soporte

### Documentación Oficial:
- AWS Amplify: https://docs.amplify.aws/
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html

### Comandos útiles:
```bash
# Ver status de git
git status

# Ver remotes configurados
git remote -v

# Ver último commit
git log -1

# Build local para probar
npm run build
npm run preview
```

---

**¡Listo para desplegar en AWS Amplify!** 🚀

