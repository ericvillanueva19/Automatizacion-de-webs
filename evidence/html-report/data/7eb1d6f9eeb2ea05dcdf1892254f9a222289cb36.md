# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conduit.spec.js >> Conduit RealWorld - CRUD Flow (Auth State) >> Creación, Verificación y Eliminación de Artículo
- Location: tests\conduit.spec.js:19:3

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('input[type="email"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "403 Forbidden" [level=1] [ref=e2]
  - list [ref=e3]:
    - listitem [ref=e4]: "Code: AccessDenied"
    - listitem [ref=e5]: "Message: Access Denied"
    - listitem [ref=e6]: "AccountId: 513366328533"
    - listitem [ref=e7]: "RequestId: ZGXK88GVH8Q6Q7J7"
    - listitem [ref=e8]: "HostId: A5mAGj2Eo7pYbDL7YZdqPyTPctYQxY1ZauAP0Ing1tN0IOjQOuMzy53Qg3o8wM+q5onkxJpab5YGuYOwOKYV0n4LsbRdh0w3"
  - separator [ref=e9]
```

# Test source

```ts
  1   | const {test, expect} = require('@playwright/test')
  2   | 
  3   | const sleep = (ms) => {
  4   |   return new Promise((resolve) => setTimeout(resolve, ms));
  5   | };
  6   | 
  7   | const tie= 1500; // Ajustado de 3000 a 1500 como sugerencia para mejor cadencia visual
  8   | 
  9   | exports.FJ = class FJ {
  10  |   constructor(page) {
  11  |     this.page = page;
  12  |   }
  13  | 
  14  |   async open() {
  15  |     await this.page.goto('https://demoqa.com/radio-button');
  16  |   }
  17  | 
  18  |   async openURL(url, tiempo = tie) {
  19  |     await this.page.goto(url);
  20  |     await sleep(tiempo);
  21  |   }
  22  | 
  23  |   async tiempo(t) {
  24  |     await sleep(t);
  25  |   }
  26  | 
  27  |   async scroll(x, y, tiempo = tie) {
  28  |     await this.page.mouse.wheel(x, y);
  29  |     await sleep(tiempo);
  30  |   }
  31  | 
  32  |   async texto(selector, val, tiempo = tie) {
> 33  |     await this.page.locator(selector).fill(val);
      |                                       ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  34  |     await sleep(tiempo);
  35  |   }
  36  | 
  37  |   async texto_val(selector, val, tiempo = tie) {
  38  |     const locator = this.page.locator(selector);
  39  |     await expect(locator).toBeEnabled();
  40  |     await expect(locator).toBeVisible();
  41  |     await expect(locator).toBeEmpty();
  42  |     await this.page.locator(selector).fill(val);
  43  |     await sleep(tiempo);
  44  |   }
  45  | 
  46  |   async texto_try(selector, val, tiempo = tie) {
  47  |     try {
  48  |       const locator = this.page.locator(selector);
  49  |       await expect(locator).toBeEnabled();
  50  |       await expect(locator).toBeVisible();
  51  |       await expect(locator).toBeEmpty();
  52  |       await this.page.locator(selector).fill(val);
  53  |       await sleep(tiempo);
  54  |     } catch(error) {
  55  |       console.log('Campo con algun Error');
  56  |     }
  57  |   }
  58  | 
  59  |   async drag_drop(ori, des, tiempo = tie) {
  60  |     await this.page.locator(ori).dragTo(this.page.locator(des));
  61  |     await sleep(tiempo);
  62  |   }
  63  | 
  64  |   async copiar_input(selector, tiempo = tie) {
  65  |     const sel = await this.page.locator(selector);
  66  |     await sel.press("Control+A");
  67  |     await sel.press("Control+C");
  68  |     await sleep(tiempo);
  69  |   }
  70  | 
  71  |   async pegar_input(selector, tiempo = tie) {
  72  |     const sel = await this.page.locator(selector);
  73  |     await sel.press("Control+V");
  74  |     await sleep(tiempo);
  75  |   }
  76  | 
  77  |   async click(selector, tiempo = tie) {
  78  |     await this.page.locator(selector).click();
  79  |     await sleep(tiempo);
  80  |   }
  81  | 
  82  |   async validar_texto(selector, val, tiempo = tie) {
  83  |     const locator = this.page.locator(selector);
  84  |     await expect(locator).toContainText(val);
  85  |     await expect(locator).toBeEnabled();
  86  |     await expect(locator).toBeVisible();
  87  |     await sleep(tiempo);
  88  |   }
  89  | 
  90  |   async validar_url(url, tiempo = tie) {
  91  |     await expect(this.page).toHaveURL(url);
  92  |     await sleep(tiempo);
  93  |   }
  94  | 
  95  |   async validar_url_lig(url, tiempo = tie) {
  96  |     await expect.soft(this.page).toHaveURL(url);
  97  |     await sleep(tiempo);
  98  |   }
  99  | 
  100 |   async validar_titulo(titulo, tiempo = tie) {
  101 |     // Corrige error del original: expect(locator) <- locator no existía
  102 |     await expect(this.page).toHaveTitle(titulo); 
  103 |     await sleep(tiempo);
  104 |   }
  105 | 
  106 |   async valor_campo(selector, tiempo = tie) {
  107 |     const value = await this.page.locator(selector).inputValue();
  108 |     await sleep(tiempo);
  109 |     return value;
  110 |   }
  111 | 
  112 |   async combo_value(selector, val, tiempo = tie) {
  113 |     const cam = await this.page.locator(selector);
  114 |     await cam.selectOption(val);
  115 |     await sleep(tiempo);
  116 |   }
  117 | 
  118 |   async combo_Label(selector, val, tiempo = tie) {
  119 |     const cam = await this.page.locator(selector);
  120 |     await cam.selectOption({ label: val });
  121 |     await sleep(tiempo);
  122 |   }
  123 | 
  124 |   async combo_multiples(selector, arg = "defaultValue", tiempo = tie) {
  125 |     const cam = await this.page.locator(selector);
  126 |     console.log(arg);
  127 |     await cam.selectOption(arg);
  128 |     await sleep(tiempo);
  129 |   }
  130 | 
  131 |   async dobleClick(selector, val, tiempo = tie) {
  132 |     const sel = await this.page.locator(selector);
  133 |     await sel.dblclick();
```