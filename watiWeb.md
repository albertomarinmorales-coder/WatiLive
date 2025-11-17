# Landing Page Gamer – Guía Completa

## 🛠 Tecnologías recomendadas

  - **Twitch API** → para saber si está en directo y obtener streams recientes  
  - **YouTube API** → para mostrar videos subidos automáticamente  
  - Títulos / Headers: `Press Start 2P` o `Arcade Classic` (pixel / arcade style)  
  - Texto principal: `Roboto`, `Open Sans` o `Inter` para legibilidad  


[// Encabezado principal]
# watiWeb

## 📐 Estructura de la landing

LandingPage
│
├─ Header
│ ├─ Avatar (círculo con imagen)
│ ├─ Nombre del streamer
│ └─ Tabs de navegación (Main Content)
│
├─ MainContent (navegable entre pestañas)
│ ├─ Biografía / Sobre mí
│ ├─ Videos de YouTube (feed automático)
│ ├─ Twitch
│ │ ├─ Últimos streams
│ │ └─ Indicador LIVE
│ └─ Otros juegos / clips adicionales
│
├─ Extras / imágenes decorativas (animaciones / sprites / items)
│
└─ Footer
├─ Redes sociales
└─ Copyright / Año

yaml
Copy code


## 🟢 Header

### Contenido

### Estilo sugerido
```css
bg-gray-900
text-white
p-4
flex
items-center
justify-between
gap-6
Animaciones
Hover en tabs: scale-105, text-red-500

Avatar: ligera animación de bounce al cargar

🟢 Main Content Tabs
Implementar con React State / Context

Tabs:

Sobre mí / Biografía: texto + iconos redes sociales

Videos de YouTube: grid de videos con thumbnails, hover animado

Twitch:

Últimos streams embebidos

Badge LIVE visible si está transmitiendo

Otros juegos / Clips: galería de imágenes y clips

Estilo sugerido
css
Copy code
bg-gray-800
p-6
rounded-lg
shadow-lg
grid grid-cols-1 md:grid-cols-3 gap-4
text-white
Animaciones
Hover en thumbnails: scale-105, shadow-xl

Fade-in de contenidos al cambiar de tab

🟢 Sección de YouTube
Funcionalidad
Usar YouTube API para obtener videos recientes del canal

Mostrar grid con thumbnail, título y fecha de subida

Click → abrir video en modal o nueva pestaña

Estilo sugerido
css
Copy code
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4
Animaciones
Thumbnail hover → scale-105, shadow-md

Fade-in al renderizar la sección

🟢 Sección de Twitch
Funcionalidad
Obtener estado LIVE y últimos streams usando Twitch API

Badge LIVE si streaming: rojo parpadeante o glow

Mostrar último stream embebido o preview

Estilo sugerido
css
Copy code
bg-gray-900
p-4
rounded-lg
text-white
flex flex-col gap-4
Animaciones
Badge LIVE → animate-pulse

Streams → hover scale y shadow

🟢 Imágenes decorativas / extras
Floating items inspirados en The Binding of Isaac

Efectos de partículas pequeñas en background (lágrimas, monedas, enemigos pixelados)

Usar motion.div para animaciones flotantes

Posicionamiento absoluto y z-index bajo

🟢 Footer
Links a Twitch, YouTube, Discord, Twitter

Copyright: “© 2025 NombreStreamer”

Mini easter egg / sprite flotante opcional

🔧 Pasos a seguir – Roadmap
Setup proyecto

bash
Copy code
npx create-next-app@latest my-gamer-landing --ts
cd my-gamer-landing
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion lucide-react react-icons axios
Configurar TailwindCSS

Configura tailwind.config.js con paths de pages y components

Agregar tipografías personalizadas (Press Start 2P y Roboto)

Crear Layout base

Header.tsx → avatar + nombre + tabs

Footer.tsx → redes + copyright

Crear Tabs y MainContent

Tabs.tsx con React State → renderizar sección según tab activa

Animaciones con Framer Motion para transición

Integración APIs

YouTube API → obtener últimos videos y mostrar grid

Twitch API → estado en directo y últimos streams

Sección de imágenes / decoraciones

Usar motion.div para animaciones floating

Posicionamiento absoluto y z-index bajo

Estilo y detalle

Colores oscuros de fondo

Acentos rojos/verde/púrpura

Hover effects y micro-interacciones

Test y optimización

Revisar responsive (mobile / tablet / desktop)

Optimizar imágenes y thumbnails

Verificar actualizaciones en tiempo real de Twitch / YouTube

✅ Tips adicionales
Mantener la landing ligera y rápida; usar lazy load para videos y sprites.

Separar componentes por función (Header, Tabs, YouTubeFeed, TwitchFeed, FloatingItems).

Usar Tailwind para prototipado rápido y animaciones simples, Framer Motion solo para efectos más complejos.

Integrar favicon o elementos de branding estilo The Binding of Isaac para personalización.