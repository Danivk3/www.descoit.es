# Desco IT – Web de presentación

Web one-page para Desco IT (Soporte y Seguridad en Madrid).  
Lista para subir a GitHub Pages y conectar con el dominio descoit.es.

## Estructura de carpetas

DescoIT/
├─ index.html
├─ style.css
├─ script.js
├─ assets/ (imágenes, logos)
└─ README.md

## Tecnologías
- HTML5
- CSS3
- JavaScript
- EmailJS (para enviar formulario a daniel.escobar@descoit.es)
- GitHub Pages (hosting gratuito)

## Instrucciones de despliegue

1. Crear repositorio en GitHub: `descoit`
2. Inicializar Git en local:
   ```bash
   git init
   git add .
   git commit -m "Versión inicial Desco IT"
   git branch -M main
   git remote add origin https://github.com/tuusuario/descoit.git
   git push -u origin main
