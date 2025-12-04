# 📹 Carpeta de Videos

## Instrucciones

Coloca tu video de presentación de Serfibanc en esta carpeta con el nombre:

```
serfibanc-presentacion.mp4
```

### Especificaciones recomendadas:
- **Formato:** MP4 (H.264)
- **Resolución:** 1920x1080 (Full HD) o 1280x720 (HD)
- **Duración:** 1-3 minutos recomendado
- **Tamaño:** Máximo 50MB para mejor rendimiento web

### Convertir tu video a MP4:
Si tienes un video en otro formato, puedes usar:
- **HandBrake** (gratuito): https://handbrake.fr/
- **CloudConvert** (online): https://cloudconvert.com/
- **VLC Media Player** (gratuito)

### Ubicación del video en el código:
El video se muestra en el Hero (sección principal) del sitio.
Archivo: `src/components/Hero.jsx`

```jsx
<video controls poster="/Imagenes/Negocios.webp">
  <source src="/videos/serfibanc-presentacion.mp4" type="video/mp4" />
</video>
```

### Cambiar el poster (imagen de vista previa):
El atributo `poster` define qué imagen se muestra antes de que se reproduzca el video.
Actualmente usa: `/Imagenes/Negocios.webp`

Puedes cambiarlo por cualquier imagen de la carpeta Imagenes.

---

**Nota:** Si no tienes un video, se mostrará un placeholder indicando dónde colocarlo.





