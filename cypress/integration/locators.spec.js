/// <reference types="cypress"/>

describe('Locators', () => {

  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  it('Using Jquery Selector..', () => {
    cy.get("[onclick*='Francisco']")
    cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3)")
    cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input")
  })

  it('Using Xpath...', () => {
    cy.xpath('//input[contains(@onclick, \'Francisco\')]')
    cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(., \'Francisco\')]/following-sibling::td/input')

  })
})