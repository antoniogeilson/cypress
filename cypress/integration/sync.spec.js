/// <reference types="cypress"/>

describe('Waits', () => {

  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  it('Wait until element is available', () => {

    //button must be clicked to show a new element
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()

    //New element
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('Test')
  })

  it('Retry', () => {

    cy.get('#buttonDelay').click()
    cy.get('#novoCampo')
      .should('exist')
      .type('Test')
  })

  it('Getting two values loaded in different times', () => {

    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')

    //lista + li span should be completely loaded to be validated
    cy.get('#lista li span')
      .should('contain', 'Item 2')
  })

  it.only('wait and timeout', () => {

    cy.get('#buttonDelay').click()
    cy.wait(5000)
    cy.get('#novoCampo', { timeout: 30000 }).should('exist')
  })

})