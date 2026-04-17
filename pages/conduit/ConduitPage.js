const { BasePage } = require('../../core/BasePage');
const fs = require('fs');

exports.ConduitPage = class ConduitPage extends BasePage {
  constructor(page, testInfo) {
    super(page, testInfo);
    // Localizadores de Conduit (Global feed, New Article)
    this.newArticleMenu = "a[href='#/editor']";
    this.articleTitleInput = "input[placeholder='Article Title']";
    this.articleAboutInput = "input[placeholder=\"What's this article about?\"]";
    this.articleBodyTextarea = "textarea[placeholder='Write your article (in markdown)']";
    this.publishButton = "button.btn-primary";
    this.deleteButton = "button.btn-outline-danger";
  }

  async login(email, password) {
    await this.openURL('https://demo.realworld.io/#/login');
    await this.texto('input[type="email"]', email);
    await this.texto('input[type="password"]', password);
    await this.click('button.btn-primary');
    // Esperar a que pase auth
    await this.tiempo(2000);
    // Guardar sesión - Playwright nativo para no repetir:
    await this.page.context().storageState({ path: 'evidence/auth.json' });
    await this.captureScreenshot('Autenticación inicial exitosa y guardada');
  }

  async navigateToNewArticle() {
    await this.click(this.newArticleMenu);
    await this.validar_url_lig(/editor/);
    await this.captureScreenshot('Pantalla Nuevo Articulo');
  }

  async createArticle(title, about, body) {
    await this.texto(this.articleTitleInput, title);
    await this.texto(this.articleAboutInput, about);
    await this.texto(this.articleBodyTextarea, body);
    await this.captureScreenshot('Llenado Formulario CRUD');
    
    await this.click(this.publishButton);
    // Esperar a la publicación (redirige al articulo)
    await this.tiempo(2000);
    await this.captureScreenshot('Articulo Creado Exitosamente');
  }

  async deleteCurrentArticle() {
    // Si la librería falla con el selector, podríamos usar locator
    await this.click(this.deleteButton);
    await this.captureScreenshot('Articulo Eliminado');
  }
};
