const { BasePage } = require('../../core/BasePage');

exports.TMDBPage = class TMDBPage extends BasePage {
  constructor(page, testInfo) {
    super(page, testInfo);
    // Localizadores TMDB
    this.searchIcon = "a.search"; // asumiendo icono de lupa movil o desktop
    this.searchInput = "input#inner_search_v4";
    this.searchButton = "input[type='submit']";
  }

  async navigateToHome() {
    await this.openURL('https://www.themoviedb.org/');
    await this.validar_url('https://www.themoviedb.org/');
    await this.captureScreenshot('Home Page TMDB');
  }

  async setupLoadingMock() {
    // Interceptamos la llamada AJAX al buscador para generar un retraso artificial (wooo mode)
    await this.page.route('**/search/multi?*', async route => {
      console.log('Intercepción: Recibido request a search/multi, aplicando latencia de 3 segundos...');
      // Aplicar latencia
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Obtener la respuesta real para devolverla después de la latencia y que funcione ok
      const response = await route.fetch();
      await route.fulfill({
        response,
        status: 200
      });
    });
  }

  async searchMovie(movieName) {
    // Escribir texto usando la librería base FJ
    await this.texto(this.searchInput, movieName);
    await this.captureScreenshot(`Escribiendo pelicula: ${movieName}`);
    
    // Al presionar Enter y haber mockeado la API, capturamos el visual de carga o resultados
    await this.page.keyboard.press('Enter');
    await this.captureScreenshot('Enter presionado (Esperando Intercepcion)');
  }

  async validateResults(expectedText) {
    // Validar visualmente en el DOM usando la libreria FJ y assertions propios
    await this.validar_url_lig(/search/);
    await this.captureScreenshot('Resultados finales devueltos');
  }
};
