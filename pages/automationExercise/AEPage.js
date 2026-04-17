const { BasePage } = require('../../core/BasePage');
const { expect } = require('@playwright/test');

exports.AEPage = class AEPage extends BasePage {
  constructor(page, testInfo) {
    super(page, testInfo);
    
    // --- LOCALIZADORES (Usando los mejores selectores de acuerdo a buenas prácticas) ---
    // Generales
    this.logo = "img[alt='Website for automation practice']";
    
    // E2E Cart & Checkout
    this.productMenu = "a[href='/products']";
    // Seleccionamos específicamente la clase de overlay o producto
    this.addToCartFirstProduct = ".features_items .col-sm-4:nth-child(3) .add-to-cart:first-child"; 
    this.continueShoppingButton = "button.btn-success:has-text('Continue Shopping')";
    this.cartMenu = "ul.nav a[href='/view_cart']";
    this.checkoutButton = "a.btn-default.check_out";
    
    // Formulario de Contacto
    this.contactMenu = "a[href='/contact_us']";
    this.contactName = "input[data-qa='name']";
    this.contactEmail = "input[data-qa='email']";
    this.contactSubject = "input[data-qa='subject']";
    this.contactMessage = "textarea[data-qa='message']";
    this.contactUpload = "input[name='upload_file']";
    this.contactSubmit = "input[data-qa='submit-button']";
    this.contactSuccessLabel = ".status.alert-success";

    // Registro
    this.signupLoginMenu = "a[href='/login']";
    this.signupName = "input[data-qa='signup-name']";
    this.signupEmail = "input[data-qa='signup-email']";
    this.signupButton = "button[data-qa='signup-button']";
    this.deleteAccountMenu = "a[href='/delete_account']";
    this.deletedAccountMsg = "h2[data-qa='account-deleted']";
  }

  /**
   * INTERCEPTOR MÁGICO CONTRA ANUNCIOS:
   * Bloquea todas las peticiones a google doubleclick o adsystems
   * Esto previene los infames iframes flotantes de Automation Exercise
   */
  async configureAdBlocker() {
    await this.page.route('**/*', route => {
      const url = route.request().url().toLowerCase();
      if (
        url.includes('google') || 
        url.includes('doubleclick') || 
        url.includes('adsystem') || 
        url.includes('ads') || 
        url.includes('ezoic')
      ) {
        route.abort(); // Aniquilar anuncios 🚫
      } else {
        route.continue();
      }
    });
    console.log('[AdBlocker] Rutas de anuncios han sido interceptadas localmente.');
  }

  async navigateToHome() {
    await this.openURL('https://automationexercise.com/');
    await this.captureScreenshot('Página de Inicio AE');
  }

  // --- SCENARIO 1: CONTACT US ---
  async fillContactUs(name, email, subject, message) {
    await this.click(this.contactMenu);
    await this.texto(this.contactName, name);
    await this.texto(this.contactEmail, email);
    await this.texto(this.contactSubject, subject);
    await this.texto(this.contactMessage, message);
    await this.captureScreenshot('Formulario Contacto Lleno');
    
    // Playwright maneja alertas nativas automáticamente, la aceptamos antes de hacer click
    this.page.once('dialog', dialog => dialog.accept());
    await this.click(this.contactSubmit);
  }

  async validateContactSuccess() {
    // Validar mensaje usando tu librería FJ
    await this.validar_texto(this.contactSuccessLabel, "Success! Your details have been submitted successfully.");
    await this.captureScreenshot('Contacto Exitoso');
  }

  // --- SCENARIO 2: REGISTER & DELETE ACCOUNT ---
  async startRegistration(name, email) {
    await this.click(this.signupLoginMenu);
    await this.texto(this.signupName, name);
    await this.texto(this.signupEmail, email);
    await this.captureScreenshot('Datos de Registro Inicial');
    await this.click(this.signupButton);
    await this.tiempo(2000); // Dar cadencia
  }
  
  async deleteRegisteredAccount() {
    // Si la pagina nos muestra logged in, borramos la cuenta para limpiar la data
    await this.click(this.deleteAccountMenu);
    await this.validar_url_lig(/delete_account/);
    await this.captureScreenshot('Cuenta Borrada');
  }

  // --- SCENARIO 3: ADD TO CART E2E ---
  async addProductToCart() {
    await this.click(this.productMenu);
    await this.tiempo(2000);
    // Agregamos producto manejando hover si es necesario
    await this.mouse_over('.features_items .col-sm-4:nth-child(3)');
    await this.click(this.addToCartFirstProduct);
    await this.captureScreenshot('Producto agregado modal');
    await this.click(this.continueShoppingButton);
  }

  async goToCartAndValidateTaxes() {
    await this.click(this.cartMenu);
    await this.tiempo(2000);
    // Extracción limpia usando locator para cálculo matemático (Woo Mode)
    const priceText = await this.page.locator('.cart_price p').first().innerText(); 
    const numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const assumedTax = (numericPrice * 0.19).toFixed(2);
    
    console.log(`🤑 [CÁLCULO E2E] Precio Base: $${numericPrice} | Impuesto QA: $${assumedTax}`);
    
    await this.captureScreenshot(`Carrito con cálculos $${numericPrice}`);
  }
};
