
import loc from './locators'

Cypress.Commands.add('accessAccountMenu', () => {
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.MENU.ACCOUNT).click()
})

Cypress.Commands.add('addAccount', (accountValue) => {
  cy.get(loc.ACCOUNT.NAME).type(accountValue)
  cy.get(loc.ACCOUNT.BTN_SAVE).click()
})