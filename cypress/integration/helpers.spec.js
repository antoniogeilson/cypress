/// <reference types="cypress"/>

describe('Helpers', () => {

  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  describe('Using Wrap...', () => {

    it('Wrap...', () => {
      const obj = { name: 'User', age: 20 }
      expect(obj).to.have.property('name')
      cy.wrap(obj).should('have.property', 'name')
    })

    it('Getting a element by Jquery + Wrap...', () => {
      cy.get('#formNome').then($el => {
        cy.wrap($el).type('It works?')
      })
    })
  })

  describe('Using Its...', () => {
    it('Getting a property from element...', () => {
      const obj = { name: 'User', age: 20 }
      cy.wrap(obj).should('have.property', 'name', 'User')
      cy.wrap(obj).its('name').should('be.equal', 'User')

    })

    it('Getting Title Page Property...', () => {
      cy.title().its('length').should('be.equal', 20)
    })
  })

  describe('Using Invoke...', () => {
    it('Working with Functions ... ', () => {

      //Function
      const getValue = () => 1;
      const sum = (a, b) => a + b;

      //adding this function inside of object
      cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
      cy.wrap({ fn: sum }).invoke('fn', 5, 7).should('be.equal', 12)

    })

    it('Example: Working with Functions ... ', () => {
      cy.get('#formNome').invoke('val', 'Text using invoke')

      cy.window().invoke('alert', 'Alert blabla')
    })

  })
})