/// <reference types="cypress"/>

import { xorBy } from 'lodash'
import loc from '../../support/locators'
var dayjs = require('dayjs')
let user = 'antonio@antonio.com'
let password = '12345'
let accountName = 'Account Antonio'
let accountNameUpdate = 'Account Antonio Updated'

describe('Test with dynamic data...', () => {

  before(() => {
    cy.login(user, password)
    cy.resetApp()
  })

  after(() => {
    cy.logout()
  })

  it('Create an Account', () => {
    cy.accessAccountMenu()
    cy.addAccount('Account Antonio')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it('Update an Account', () => {
    cy.accessAccountMenu()
    cy.xpath(loc.ACCOUNT.FN_XP_BTN_UPDATE(accountName)).click()
    cy.get(loc.ACCOUNT.NAME)
      .clear()
      .type(accountNameUpdate)
    cy.get(loc.ACCOUNT.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })

  it('Delete an Account', () => {
    cy.accessAccountMenu()
    cy.xpath(loc.ACCOUNT.FN_XP_BTN_DELETE(accountNameUpdate)).click()


    // FN_XP_BTN_DELETE
    // cy.xpath("//table//td[contains(.,'Account Antonio Updated')]/..//i[@class='far fa-trash-alt']").click()
    cy.get('.toast').should('contain', 'Conta excluída com sucesso')
  })

  it('Create a transaction', () => {
    cy.get(loc.MENU.TRANSACTION).click();

    cy.get(loc.TRANSACTION.DESCRIPTION).type('Desc');
    cy.get(loc.TRANSACTION.VALUE).type('123');
    cy.get(loc.TRANSACTION.RELATED).type('Inter');
    cy.get(loc.TRANSACTION.BTN_SAVE).click();
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
  })
})