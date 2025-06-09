import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    BURGER_API_URL: 'https://norma.nomoreparties.space/api'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
