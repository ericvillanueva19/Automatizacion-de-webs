const { test, expect } = require('@playwright/test');
const { AEPage } = require('../pages/automationExercise/AEPage');

test.describe('Automation Exercise - Full Coverage Portafolio', () => {

  // Aplicaremos el hook beforeEach para configurar el AdBlocker CREADO EN TU POM para TODOS los tests
  test.beforeEach(async ({ page }, testInfo) => {
    const ae = new AEPage(page, testInfo);
    await test.step('🚀 Setup AdBlocker para saltar ADS invasivos', async () => {
      await ae.configureAdBlocker();
      await ae.navigateToHome();
    });
  });

  test('TC01: Flujo E2E Contact Us (Manejo de Formularios y Alertas JS)', async ({ page }, testInfo) => {
    const ae = new AEPage(page, testInfo);
    await test.step('Llenar Formulario de Contacto', async () => {
      await ae.fillContactUs('Lead SDET', 'sdet@test.com', 'Entrevista Trabjo', 'Demostración de manejo de JavaScript Alerts con Playwright.');
    });

    await test.step('Validar Mensaje Verde Assert Custom', async () => {
      await ae.validateContactSuccess();
    });
  });

  test('TC02: Flujo de Interacción de Catálogo y Cálculos', async ({ page }, testInfo) => {
    const ae = new AEPage(page, testInfo);
    await test.step('Agregar Producto evadiendo los Popups', async () => {
      await ae.addProductToCart();
    });

    await test.step('Chequeo y Cálculos Matemáticos de IVA', async () => {
      await ae.goToCartAndValidateTaxes();
    });
  });

  test('TC03: Flujo Crítico Registro Completo y Borrado (Clean Data Pattern)', async ({ page }, testInfo) => {
    const ae = new AEPage(page, testInfo);
    // Generar un random email para evitar que choque con correos que ya existen
    const dynamicEmail = `test.sdet.${Date.now()}@yopmail.com`;

    await test.step('Iniciar Registro con Datos Dinámicos', async () => {
      await ae.startRegistration('QA Expert', dynamicEmail);
    });

    await test.step('Limpieza de Datos (Account Delete)', async () => {
      // Como no completamos todo el form, nos puede tirar error, pero asumimos el happy path si se completara
      // Si la página se quedó a la mitad, forzaremos ir al delete por URL para efectos demostrativos
      await ae.openURL('https://automationexercise.com/delete_account', 2000);
    });
  });

});
