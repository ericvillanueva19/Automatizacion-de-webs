const { test, expect } = require('@playwright/test');
const { ConduitPage } = require('../pages/conduit/ConduitPage');
const fs = require('fs');

// Verifica si existe sesión o si debemos configurarla y usarla
let hasSession = false;
try {
  if (fs.existsSync('evidence/auth.json')) {
    hasSession = true;
  }
} catch(err) { }

test.describe('Conduit RealWorld - CRUD Flow (Auth State)', () => {
  // Aplicamos la sesión guardada si existe WOOOO
  if (hasSession) {
    test.use({ storageState: 'evidence/auth.json' });
  }

  test('Creación, Verificación y Eliminación de Artículo', async ({ page }, testInfo) => {
    const conduit = new ConduitPage(page, testInfo);
    
    if (!hasSession) {
      await test.step('Paso Setup: Generar auth.json (Solo si no existía)', async () => {
        // En una real lo haríamos con data en ENV
        await conduit.login('tester-sdet@example.com', 'Test1234!');
      });
    }

    await test.step('Paso 1: Abrir Home (Ya autenticado gracias a storageState)', async () => {
      await conduit.openURL('https://demo.realworld.io/#/');
    });

    await test.step('Paso 2: Navegar a Formulario de Creación', async () => {
      await conduit.navigateToNewArticle();
    });

    await test.step('Paso 3: Crear Artículo (CRUD - CREATE)', async () => {
       const stamp = Date.now();
       await conduit.createArticle(`Mi Framework Playwright ${stamp}`, 'SDET Portfolio', 'El body de mi super articulo automatizado');
    });

    await test.step('Paso 4: Eliminar Artículo (CRUD - DELETE)', async () => {
       // El framework redirige automáticamente a la vista del articulo donde está el btn DELETE
       await conduit.deleteCurrentArticle();
    });

  });
});
