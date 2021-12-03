// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import { restore } from "cypress/types/sinon"

Cypress.Commands.add('checkMessage', (locator, message) => {
  cy.get(locator).should('contain', message)
})

Cypress.Commands.add('getToken', (user, password) => {
  cy.request({
    method: 'Post',
    url: '/signin',
    body: {
      email: user,
      senha: password,
      redirecionar: false
    }
  }).its('body.token').should('not.be.empty')
    .then(token => {
      return token
    })
})

Cypress.Commands.add('resetAccount', (user, password) => {
  cy.getToken(user, password).then(token => {
    cy.request({
      method: 'GET',
      url: '/reset',
      headers: { Authorization: `JWT ${token}` }
    }).its('status').should('be.equal', 200)
  })
})

Cypress.Commands.add('getAccountByName', (user, password, accountName) => {
  cy.getToken(user, password).then(token => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: accountName
      }
    }).then(res => {
      return res.body[0].id
    })
  })
})
