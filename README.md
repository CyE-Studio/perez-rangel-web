# Web corporativa · Transportes Pérez Rangel (propuesta)

Propuesta de web moderna para sustituir la actual (Google Sites). Es un sitio estático sin dependencias: se abre con doble clic en `index.html` y se puede alojar en cualquier servidor o servicio de páginas estáticas.

## Diseño (versión fotográfica, 23/10/2026)
Referencias del sector: DSV, Primafrio, XPO y Transportes Fuentes comparten fotografía a sangre, titulares grandes, bandas de cifras, ritmo oscuro/claro y una llamada a la acción fija. Esta propuesta sigue ese patrón con la identidad de Pérez Rangel:
- **Portada** a pantalla completa con tres fotografías reales de la flota en fundido lento (atardecer en la base, MAN en el bosque, Mercedes) y zoom suave; titular con el eslogan en tipografía Outfit; cabecera transparente que se vuelve blanca y se oculta al bajar.
- **Marquesina** roja con los servicios y **cifras** grandes con contador.
- **Servicios** en rejilla editorial con fotografía en las seis tarjetas (MAN en el bosque, nave, tautliner lateral, base al atardecer, Actros en carretera, flota en la base).
- **Flota**: banda fotográfica con parallax (fila de tractoras en la base), galería deslizante de seis fotografías con marca y modelo visibles (Volvo FH, MAN TGX, Mercedes-Benz Actros, nieve) y ficha técnica.
- **Cobertura** con mapa de rutas, **cita** sobre la foto de nieve, **Cómo trabajamos**, **Empresa** con la fachada de la nave y el sello circular, línea de tiempo 1982 / 1993 / hoy, los cinco departamentos y **Certificaciones** reales.
- **Empleo** sobre foto de montaña con formulario, **Contacto** con formulario de presupuesto, pie con nota FEDER.

### Mejoras de la revisión (23/10/2026)
- Leyenda por fotografía en la portada (qué se ve y dónde).
- Mapa de cobertura incrustado con etiquetas legibles y rutas que se dibujan al entrar en pantalla; tiempos de viaje orientativos desde la base (Sevilla, Lisboa, Madrid, Oporto; **aproximados, confirmar**).
- Sección «Cómo trabajamos» en tres pasos (solicitud, planificación, entrega con seguimiento).
- Certificaciones reales: ISO 9001 e ISO 14001 (EQA/ENAC) ampliables, política de calidad y medio ambiente, y ayudas FEDER de la Junta de Extremadura, cuya mención es obligatoria.
- Botón «volver arriba» a partir del primer desplazamiento largo.

### Pulido final (23/10/2026)
- **Galería ampliable**: las fotos de la flota, la fachada de la nave y los certificados se abren a pantalla completa (flechas, teclado, Escape, cierre al pulsar fuera).
- **Portada reactiva**: la fotografía se desplaza suavemente con el ratón (solo con puntero fino y sin movimiento reducido).
- **Barra de progreso** de lectura en rojo bajo el borde superior.
- **Barra fija de acción en móvil** («Escribir» y «Solicitar presupuesto») para que la llamada a la acción esté siempre a un pulgar.
- **Metadatos sociales** (Open Graph) para que el enlace se vea con imagen y titular al compartirlo por WhatsApp o correo. La imagen va con ruta relativa: al publicar hay que ponerla con la URL absoluta del dominio.
- **PDF de la propuesta**: `node scripts/web-pdf.mjs` genera `web/Transportes-Perez-Rangel-propuesta-web.pdf` (≈3,4 MB, página completa a 1.440 px) para enviarlo o imprimirlo.

## Fotografías
Trece imágenes facilitadas por el cliente interno (23/10/2026), procesadas con `node scripts/web-photos.mjs <carpeta>`: redimensionadas (máximo 1.800 px), comprimidas (2,6 MB en total) y dos recortes: la fachada de la nave a partir de un pantallazo de redes sociales (`nave.jpg`, baja resolución: conviene pedir el original) y el sello circular (`sello.png`). Las matrículas de los vehículos son visibles en las fotos; en una web pública conviene difuminarlas o pedir conformidad.

## Datos: qué es real y qué está pendiente
| Dato | Origen |
|---|---|
| Eslogan, servicios, flota (+40 tractoras, 50 semirremolques tautliner), almacén 5.000 m², ~50 trabajadores, departamentos, dirección, correo, nota FEDER | Web pública de la empresa |
| Marcas de la flota (MAN, Volvo, Mercedes-Benz, DAF) | Visibles en las fotografías facilitadas |
| 1982 y 1993 | Rotulados en la fachada de la nave (foto) y coherentes con «principios de los 80» de su portada y «desde 1993» de su página de servicios. Se interpreta 1982 como origen y 1993 como constitución de la S.L.: **confirmar** |
| Certificados ISO 9001:2015 (nº 11269-CA) e ISO 14001:2015 (nº 11269-MA) de EQA/ENAC, política de calidad y medio ambiente (30/01/2024) y dos ayudas FEDER de la Junta de Extremadura (MC-20-0024 y AC-24-0003-2) | Página «Certificaciones» de su web (imágenes descargadas el 23/10/2026 a `assets/certs/`). **Atención:** el certificado ISO 9001 muestra fecha de expiración 05/06/2025; pedir el certificado renovado antes de publicar |
| Teléfono, horario, textos legales, versión francesa | **Pendientes de facilitar** (marcados en la web) |
| Formularios | Maquetas: no envían datos |

## Comprobar y capturar
Desde la raíz del repositorio: `node scripts/web-shots.mjs` (página completa en escritorio y móvil, comprueba desbordamiento y errores de consola) y `node scripts/web-sections.mjs web/capturas 1440` (secciones a tamaño real). Resultados en `web/capturas/`.

## Accesibilidad y rendimiento
Sin librerías; tipografías Inter y Outfit empaquetadas; animaciones desactivadas si el sistema pide movimiento reducido; galería navegable con teclado; enlace «saltar al contenido». Peso total ≈ 3 MB por las fotografías (carga diferida salvo la portada).

Historial: la primera versión (23/10/2026) llevaba un camión ilustrado; la segunda, un diseño sobrio sin fotos; la tercera y actual incorpora la fotografía real del cliente.
