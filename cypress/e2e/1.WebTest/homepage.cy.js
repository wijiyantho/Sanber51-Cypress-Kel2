
import loginPage from '../../support/pageObject/loginPage'
const userData = require('../../fixtures/userdata.json')

describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('')
  })

  it('Signup without type first name', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.get('#firstname').should('exist').type('{enter}')
    cy.get('#firstname-error').should('be.visible')
  })

  it('Signup with type first name', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.get('#firstname').type(Cypress.env('firstName'))
  })

  it('Signup without type last name', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.get('#firstname').type(Cypress.env('firstName'))
    cy.get('#lastname').should('exist').type('{enter}')
    cy.get('#lastname-error').should('be.visible')
  })

  it('Signup with type last name', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.get('#firstname').type(Cypress.env('firstName'))
    cy.get('#lastname').should('exist').type(Cypress.env('lastName'))
  })

  it('Signup without type email', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').should('exist').type('{enter}')
    cy.get('#email_address-error').should('be.visible')
  })

  it('Signup with type wrong email', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').should('exist').type(Cypress.env('wrongEmail')).type('{enter}')
    cy.get('#email_address-error').should('be.visible').contains('Ex: johndoe@domain.com')
  })

  it('Signup with type correct email', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').clear()
    cy.get('#email_address').should('exist').type(Cypress.env('crctEmail')).type('{enter')
    cy.get('#password').should('exist')
  })

  it('Signup without type password', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get(loginPage.emladr).clear()
    //cy.get('#email_address').clear()
    cy.get(loginPage.emladr).should('exist').type(Cypress.env('crctEmail'))
    //cy.get('#email_address').should('exist').type(Cypress.env('crctEmail'))
    cy.get(loginPage.pswd).should('exist')
    //cy.get('#password').should('exist')
    cy.get(loginPage.pswd).type('{enter}')
    //cy.get('#password').type('{enter}')
    cy.get('#password-strength-meter').should('be.visible').contains('No Password')
  })

  it('Signup with type weak password', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').clear()
    cy.get('#email_address').should('exist').type(Cypress.env('crctEmail'))
    cy.get('#password').should('exist')
    cy.get('#password').type(Cypress.env('wrongPass')).type('{enter}')
    cy.get('#password-strength-meter').should('be.visible').contains('Weak')
  })

  it('Signup with type correct password', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').clear()
    cy.get('#email_address').should('exist').type(Cypress.env('crctEmail'))
    cy.get('#password').should('exist')
    cy.get('#password').clear()
    cy.get('#password').type(userData.validpass).type('{enter}')
    cy.get('#password-strength-meter').should('exist')
  })

  it('Signup with wrong confirmation', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').clear()
    cy.get('#email_address').should('exist').type(Cypress.env('crctEmail'))
    cy.get('#password').should('exist')
    cy.get('#password').clear()
    cy.get('#password').type(Cypress.env('crctPass'))
    cy.get('#password-strength-meter').should('exist')
    cy.get('#password-confirmation').type(userData.invalidpass).type('{enter}')
    cy.get('#password-confirmation-error').should('be.visible')
  })

  it('Signup with correct confirmation', () => {
    cy.get(':nth-child(3)').contains('Create an Account').click()
    cy.location('pathname').should('equal','/customer/account/create/')
    cy.fullname(Cypress.env('firstName'), Cypress.env('lastName'))
    cy.get('#email_address').clear()
    cy.get('#email_address').should('exist').type(Cypress.env('crctEmail'))
    cy.get('#password').should('exist')
    cy.get('#password').clear()
    cy.get('#password').type(userData.validpass)
    cy.get('#password-strength-meter').should('exist')
    cy.get('#password-confirmation').clear().type(Cypress.env('crctPass')).type('{enter}')
    cy.location().should((loc) => {expect(loc.href).to.include('/customer/account/')})
  })


  it('Sign in with wrong e-mail and password', () => {
    cy.get('.authorization-link').contains('Sign In').click()
    cy.location().should((loc) => {expect(loc.href).to.include('customer/account/login')})
    cy.get('#email').type(Cypress.env('crctEmail1'))
    cy.get('#pass').type(Cypress.env('crctPass1')).type('{enter}')
    cy.get('.message-error').should('be.visible')
  })

  it('Sign in with correct e-mail and password', () => {
    cy.get('.authorization-link').contains('Sign In').click()
    cy.location().should((loc) => {expect(loc.href).to.include('customer/account/login')})
    cy.get('#email').clear().type(Cypress.env('crctEmail'))
    cy.get('#pass').type(Cypress.env('crctPass')).type('{enter}')
  })

})