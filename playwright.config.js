const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'evidence/html-report', open: 'never' }],
    ['list']
  ],
  use: {
    headless: false, // ¡Para que se vea la ventana correr mágicamente!
    trace: 'on', // Trace completo activo siempre (Woooo! Evidence)
    screenshot: 'on', // Capturas habilitadas
    video: 'retain-on-failure',
    actionTimeout: 15000, 
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
