/// <reference types="cypress"/>
var dayjs = require('dayjs')

describe('Test with dynamic data...', () => {

  before(() => {
    cy.visit('https://barrigareact.wcaquino.me')
    cy.get('[data-test=email]').type('antonio@antonio.com')
    cy.get('[data-test=passwd]').type('12345')
    cy.get('.btn').click()
    cy.get('.toast-message').should('contain', 'Bem vindo, Antonio!')

  })

  it.only('Create an Account', () => {
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()
    cy.get('[data-test=nome]').type('Account Antonio')
    cy.get('.btn').click()
    cy.get('.toast').should('contain', 'Conta inserida com sucesso')

  })

  it('Update an Account', () => {
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()
    cy.xpath("//table//td[contains(.,'Account Antonio')]")
      .should('contain', 'Account Antonio')
    cy.xpath("//table//td[contains(.,'Account Antonio')]/..//i[@class='far fa-edit']").click()
    cy.get('[data-test=nome]')
      .clear()
      .type('Account Antonio Updated')
    cy.get('.btn').click()
    cy.get('.toast').should('contain', 'Conta atualizada com sucesso')

  })

  it('Delete an Account', () => {
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()
    cy.xpath("//table//td[contains(.,'Account Antonio Updated')]")
      .should('contain', 'Account Antonio Updated')
    cy.xpath("//table//td[contains(.,'Account Antonio Updated')]/..//i[@class='far fa-trash-alt']").click()
    cy.get('.toast').should('contain', 'Conta excluída com sucesso')
  })
})