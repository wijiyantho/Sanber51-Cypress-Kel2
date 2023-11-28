const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 5000, 
    baseUrl: 'https://magento.softwaretestingboard.com/',
    env: {
      firstName: 'mereka',
      lastName: 'berjaya',
      wrongPass: '12345',
      crctPass: '12345#Mereka',
      wrongPass1: '1234',
      crctPass1: '1234#Mereka',
      wrongEmail: 'mereka',
      crctEmail: 'mereka@contoh.com',
      wrongEmail1: 'kami',
      crctEmail1: 'kami@example.com',
    }
  },
});
