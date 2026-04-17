const { FJ } = require('./FJ');

exports.BasePage = class BasePage extends FJ {
  constructor(page, testInfo) {
    // Inicializa la clase FJ de la que hereda
    super(page);
    this.testInfo = testInfo;
  }

  /**
   * Toma un screenshot y lo adjunta al reporte HTML de Playwright dinámicamente.
   * Evidencia WOOOO mode.
   * @param {string} stepName - Nombre del paso que se describirá en la foto
   */
  async captureScreenshot(stepName) {
    if (this.testInfo) {
      // Creamos nombre sanitizado
      const cleanName = stepName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      // Tomamos el screenshot en buffer para meterlo nativamente al reporte sin guardar basura
      const screenshot = await this.page.screenshot();
      await this.testInfo.attach(`Paso Evidencia: ${stepName}`, {
        body: screenshot,
        contentType: 'image/png'
      });
      console.log(`[Evidencia] Screenshot capturado: ${stepName}`);
    }
  }
};
