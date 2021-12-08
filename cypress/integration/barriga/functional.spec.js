/// <reference types="cypress"/>

import loc from '../../support/locators'
var dayjs = require('dayjs')
let user = 'antonio@antonio.com'
let password = '12345'

describe('Test with dynamic data...', () => {

  before(() => {
    cy.login(user, password)
  })

  it('Create an Account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
    cy.get(loc.ACCOUNT.NAME).type('Account Antonio')
    cy.get(loc.ACCOUNT.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it('Update an Account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
    cy.xpath(loc.ACCOUNT.XP_BTN_UPDATE).click()
    cy.get(loc.ACCOUNT.NAME)
      .clear()
      .type('Account Antonio Updated')
    cy.get(loc.ACCOUNT.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })

  it('Delete an Account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
    cy.xpath("//table//td[contains(.,'Account Antonio Updated')]/..//i[@class='far fa-trash-alt']").click()
    cy.get('.toast').should('contain', 'Conta excluída com sucesso')
  })
})