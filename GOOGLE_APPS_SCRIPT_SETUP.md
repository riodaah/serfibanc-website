# 📊 Configuración de Google Sheets para Serfibanc

## 🎯 Objetivo

Guardar automáticamente todas las simulaciones de crédito en el Google Sheet:
**https://docs.google.com/spreadsheets/d/1iesEn_v4IV9Ghzu-vL-tpKxWxOQaFvGD864pDIQbd3s/**

---

## ⏱️ Tiempo: 10 minutos

---

## 📝 PASO 1: Abrir Google Apps Script (2 min)

1. Abre el Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/1iesEn_v4IV9Ghzu-vL-tpKxWxOQaFvGD864pDIQbd3s/edit
   ```

2. Ve a: **Extensiones** > **Apps Script**

3. Se abrirá una nueva pestaña con el editor de Apps Script

---

## 📝 PASO 2: Copiar el Código (3 min)

1. **Borra** todo el código que aparece por defecto

2. **Copia y pega** este código:

```javascript
/**
 * Google Apps Script para Serfibanc
 * Recibe las simulaciones desde el sitio web y las guarda en el Sheet
 */

function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var datos = JSON.parse(e.postData.contents);
    
    Logger.log('📊 Datos recibidos: ' + JSON.stringify(datos));
    
    // Preparar la fila con los datos
    var fila = [
      datos.nombre || '',              // A: Nombre
      datos.email || '',               // B: Email
      datos.telefono || '',            // C: Telefono
      datos.tipoCredito || '',         // D: tipo de credito
      '',                              // E: ingreso_liquido_mensual (vacío)
      '',                              // F: Clasifica (vacío por ahora)
      datos.fechaSimulacion || '',     // G: Fecha de simulación
      datos.montoCredito || 0,         // H: Monto Credito
      datos.cantidadCuotas || 0,       // I: Cantidad de cuotas
      datos.tasaInteres || 0,          // J: Tasa de Interes
      datos.valorCuota || 0,           // K: Valor cuota
      datos.contactoWhatsapp || 'No',  // L: Contacto whatsapp
      ''                               // M: Agente (vacío)
    ];
    
    // Agregar la fila al final del sheet
    sheet.appendRow(fila);
    
    Logger.log('✅ Fila agregada exitosamente');
    
    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'row': fila
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    
    // Responder con error
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba (opcional)
function test() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Juan Pérez TEST',
        email: 'juan@test.cl',
        telefono: '912345678',
        tipoCredito: 'PYME',
        fechaSimulacion: new Date().toLocaleString('es-CL'),
        montoCredito: 10000000,
        cantidadCuotas: 24,
        tasaInteres: 1.2,
        valorCuota: 500000,
        contactoWhatsapp: 'Sí'
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. **Guarda** el proyecto:
   - Click en el ícono de diskette 💾
   - O presiona `Ctrl + S` (Windows) / `Cmd + S` (Mac)
   - Ponle un nombre: **"Serfibanc - Webhook Simulaciones"**

---

## 📝 PASO 3: Deploy como Web App (3 min)

1. Click en **"Deploy"** (Implementar) > **"New deployment"** (Nueva implementación)

2. Click en el ícono de engranaje ⚙️ junto a "Select type"

3. Selecciona **"Web app"**

4. Configura:
   - **Description**: "Webhook para simulaciones Serfibanc"
   - **Execute as**: **Me** (tu cuenta)
   - **Who has access**: **Anyone** ⚠️ IMPORTANTE

5. Click **"Deploy"** (Implementar)

6. Te pedirá autorización:
   - Click **"Authorize access"**
   - Selecciona tu cuenta de Google
   - Click **"Advanced"** (Avanzado)
   - Click **"Go to Serfibanc - Webhook Simulaciones (unsafe)"**
   - Click **"Allow"**

7. **COPIA LA URL** que aparece (algo como):
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

---

## 📝 PASO 4: Configurar en el Proyecto (2 min)

1. Abre el archivo `.env` en el proyecto

2. Agrega esta línea con la URL que copiaste:
   ```env
   VITE_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/TU_URL_AQUI/exec
   ```

3. **Guarda** el archivo

---

## 🧪 PASO 5: Probar (Opcional)

### Opción 1: Probar desde Apps Script

1. En el editor de Apps Script, selecciona la función `test` en el dropdown
2. Click en **"Run"** (Ejecutar)
3. Verifica que aparezca una fila de prueba en tu Google Sheet

### Opción 2: Probar desde el sitio

1. Después de hacer build y deploy
2. Abre el simulador
3. Completa una simulación
4. Verifica que aparezca en el Google Sheet

---

## 📊 Estructura del Sheet

Las columnas que se llenarán automáticamente son:

| Columna | Campo                | Ejemplo              |
|---------|----------------------|----------------------|
| A       | Nombre               | Juan Pérez           |
| B       | Email                | juan@ejemplo.cl      |
| C       | Teléfono             | +56912345678         |
| D       | Tipo de crédito      | PYME                 |
| E       | Ingreso mensual      | (vacío por ahora)    |
| F       | Clasifica            | (vacío por ahora)    |
| G       | Fecha de simulación  | 14/12/2024 10:30:00  |
| H       | Monto Crédito        | 10000000             |
| I       | Cantidad de cuotas   | 24                   |
| J       | Tasa de Interés      | 1.2                  |
| K       | Valor cuota          | 500000               |
| L       | Contacto whatsapp    | Sí                   |
| M       | Agente               | (vacío por ahora)    |

---

## 🆘 Solución de Problemas

### Error: "Authorization required"
- Vuelve a hacer el deploy
- Asegúrate de seleccionar "Anyone" en "Who has access"

### No aparecen las simulaciones
- Verifica que la URL esté correcta en `.env`
- Verifica que empiece con `VITE_`
- Haz build y deploy nuevamente: `npm run build && firebase deploy`

### Aparece "Script function not found: doPost"
- Asegúrate de que el código esté guardado
- Verifica que la función se llame exactamente `doPost`

---

## 📱 Ver Logs de Apps Script

Para ver si las simulaciones están llegando:

1. En Apps Script, ve a **Executions** (Ejecuciones) en el menú izquierdo
2. Ahí verás cada vez que se ejecuta el script
3. Click en una ejecución para ver los logs

---

## ✅ Checklist

- [ ] Apps Script creado y guardado
- [ ] Web App deployada
- [ ] URL copiada
- [ ] `.env` actualizado con la URL
- [ ] Build y deploy realizados
- [ ] Prueba exitosa

---

¡Listo! Ahora todas las simulaciones se guardarán automáticamente en tu Google Sheet 🎉

