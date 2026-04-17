# 🚀 Lead SDET Automation Portfolio

Bienvenido a mi portafolio profesional de pruebas automatizadas construido con **Playwright** y **JavaScript**. Este framework ha sido diseñado bajo los principios más limpios y robustos de la automatización E2E, utilizando un patrón avanzado de **Page Object Model (POM)** y una clase Core (FJ) 100% personalizada.

## 🌟 Características Destacadas
- **Arquitectura POM Personalizada:** Toda la interacción central se hereda de una clase utilitaria profunda para manipulación de DOM, Waits y Assertions asíncronos.
- **WOOOO Mode Evidences (Trace + Screenshots):** Integración nativa de capturas de pantalla dinámicas por paso. Fallos loggeados con todo el DOM context y video retenido.
- **Smart AdBlocker:** Intercepción nativa que previene, detecta y anula anuncios (`doubleclick`, `googleads`, etc.) inyectados en runtime para que no afecten los tests.
- **Simulación y Latencia (Mocking API):** Intercepciones de red (API Responses) para evaluar latencias visuales realistas usando `page.route()`.
- **Sesiones Persistentes:** Almacenamiento de cookies web via `storageState` para omitir logins repetitivos (`auth.json`).

## ⚙️ Estructura del Proyecto

```text
Automatizacion de webs/
├── core/
│   ├── FJ.js                     # Librería Custom de control base para Playwright
│   └── BasePage.js               # Envoltorio POM con interceptor dinámico de pantallas
├── pages/                        # Componentes POM por sistema analizado
├── tests/                        # Casos de Uso estructurados en Behavior y Pasos E2E
├── playwright.config.js          # Reportería HTML, Traces, e inyección de paralelismo (Headed)
└── README.md
```

## 💻 Instalación Rápida

Asegúrate de contar con [Node.js](https://nodejs.org/) instalado en tu equipo.

1. Clona o descarga el repositorio y abre una terminal dentro de la carpeta raíz.
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Instala el binario nativo de los navegadores controlados de Playwright (solo requieres Chromium para esta suite demostrativa):
   ```bash
   npx playwright install chromium
   ```

## 🚀 Ejecución de las Pruebas (Tests Runners)

Este framework está paralelizado. Verás que se despliegan simultáneamente múltiples instancias *(Headed Mode)* calculando flujos en paralelo.

| Comando | Acción |
| :--- | :--- |
| `npm run test:all` | **Ejecuta toda la suite completa en paralelo (Los 5 Casos de Uso)** |
| `npm run test:tmdb` | Ejecuta únicamente los specs de TMDB (Mocking de APIs) |
| `npm run test:ae` | Ejecuta los flujos E2E Financieros y de Registros de WebEcommerce |
| `npm run test:conduit`| Prueba de sesión persistente asíncrona sobre una red CRUD |

## 📊 Exploración Científica: El Reporte de Evidencia

Uno de los pilares de este proyecto es su trazabilidad post-mortem. Una vez que los tests corran (pasen o fallen), ejecuta el servidor local para visualizar tu evidencia.

```bash
npm run report
```

### ¿Qué ocurre en el Reporte?
1. Se abrirá una interfaz local (típicamente en `http://localhost:9323`).
2. Podrás indagar en pasos que fallaron para analizar la robusteza del diseño.
3. Desliza hacia abajo dentro de uno de los Test fallidos y haz clic sobre el archivo **Trace**. Verás una reconstrucción completa de la máquina del tiempo, la consola del navegador remoto y su tráfico de RED.

---
*Hecho por un especialista para demostrar código mantenible, escalable y WOOOO!*
