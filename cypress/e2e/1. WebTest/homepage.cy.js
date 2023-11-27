describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/')
  })

  it('Sign Up Test 1st Time', () => {

    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    
    it('Insert empty first name', () => {
      cy.get('#firstname').should('exist').type('{enter}')
      cy.get('#firstname-error').should('be.visible')
    })
  
    // Insert correct first name
    cy.get('#firstname').type('saya{enter}')

    it('Insert empty last name', () => {
      cy.get('#lastname').should('exist').type('{enter}')
      cy.get('#lastname-error').should('be.visible')
    })

    // Insert correct last name
    cy.get('#lastname').should('exist').type('saya{enter}')

    it('Insert empty email', () => {
      cy.get('#email_address').should('exist').type('{enter}')
      cy.get('#email_address-error').should('be.visible')
    })

    it('Insert wrong email', () => {
      cy.get('#email_address').should('exist').type('saya{enter}')
      cy.get('#email_address-error').should('be.visible').contains('Ex: johndoe@domain.com')
    })

    it('Insert correct email', () => {
      cy.get('#email_address').clear()
      cy.get('#email_address').should('exist').type('saya@example.com{enter}')
      cy.get('#password').should('exist')
    })

    it('Insert empty password', () => {
      cy.get('#password').type('{enter}')
      cy.get('#password-strength-meter').should('be.visible').contains('No Password')
    })

    it('Insert weak password', () => {
      cy.get('#password').type('saya{enter}')
      cy.get('#password-strength-meter').should('be.visible').contains('Weak')
    })

    it('Insert correct password', () => {
      cy.get('#password').clear()
      cy.get('#password').type('Saya@1234{enter}')
      cy.get('#password-strength-meter').should('exist')
    })

    it('Confirm different password', () => {
      cy.get('#password-confirmation').type('Saya@123456{enter}')
      cy.get('#password-confirmation-error').should('be.visible')
    })

    it('Confirm same password', () => {
      cy.get('#password-confirmation').clear().type('Saya@1234{enter}')
      cy.location().should((loc) => {expect(loc.href).to.include('/customer/account/')})
    })

  })

  it('Sign In Test', ()=> {
    cy.get('.authorization-link').contains('Sign In').click()
    cy.location().should((loc) => {expect(loc.href).to.include('customer/account/login')})

    it('input wrong e-mail and password', () => {
      cy.get('#email').type('saya@example.com')
      cy.get('#pass').type('saya@123456{enter}')
      cy.get('.message-error').should('be.visible')
    })

    it('input correct e-mail and password', () => {
      cy.get('#email').clear().type('saya@contoh.com')
      cy.get('#pass').type('saya@1234{enter}')
    })

  })

})