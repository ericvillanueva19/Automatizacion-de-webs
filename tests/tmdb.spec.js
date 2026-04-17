const { test, expect } = require('@playwright/test');
const { TMDBPage } = require('../pages/tmdb/TMDBPage');

test.describe('TMDB Scenarios - Búsqueda con API Interception', () => {

  test('Realizar búsqueda con simulación de latencia en API', async ({ page }, testInfo) => {
    // Instanciar POM (envolviendo FJ y Playwright testInfo)
    const tmdb = new TMDBPage(page, testInfo);

    await test.step('Paso 1: Navegar a Home', async () => {
      await tmdb.navigateToHome();
    });

    await test.step('Paso 2: Configurar Interdicción (Mocking/Latencia)', async () => {
      await tmdb.setupLoadingMock();
    });

    await test.step('Paso 3: Realizar Búsqueda y esperar la respuesta demorada', async () => {
      await tmdb.searchMovie('Inception');
      // La latencia de la API hará que esto demore explícitamente y verifiquemos estados WOOOO
    });

    await test.step('Paso 4: Validar Carga Correcta', async () => {
      await tmdb.validateResults('Inception');
    });

  });
});
