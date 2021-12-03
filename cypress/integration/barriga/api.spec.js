/// <reference types="cypress"/>
var dayjs = require('dayjs')

describe('Test with API dynamic data...', () => {
  let token
  let user = 'antonio@antonio.com'
  let password = '12345'
  let accountName = 'Account_Antonio'
  let accountNameUpdated = 'Account_Antonio_Updated'

  before(() => {
    cy.getToken(user, password)
      .then(tkn => {
        token = tkn
      })
    cy.resetAccount(user, password)
  })

  beforeEach(() => {
  })

  it('Login console output', () => {
    cy.request({
      method: 'POST',
      url: '/signin',
      body: {
        email: user,
        redirecionar: false,
        senha: password
      }
    }).then(res => console.log(res))
  })

  it('Create account', () => {
    cy.request({
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: accountName
      }
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201),
        expect(res.body).to.have.property('id'),
        expect(res.body).to.have.property('nome', accountName)
    })
  })

  it('Update account', () => {
    cy.request({
      method: 'GET',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      qs: {
        nome: accountName
      }
    }).then(res => {
      cy.request({
        method: 'PUT',
        headers: { Authorization: `JWT ${token}` },
        url: `/contas/${res.body[0].id}`,
        body: {
          nome: accountNameUpdated
        }
      }).as('response')
      cy.get('@response').then(res => {
        expect(res.status).to.be.equal(200),
          expect(res.body).to.have.property('id'),
          expect(res.body).to.have.property('nome', accountNameUpdated)
      })
    })
  })

  it('Should not create account duplicated', () => {
    cy.request({
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      url: '/contas',
      body: {
        nome: 'Conta para extrato'
      },
      failOnStatusCode: false
    }).as('response')
    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400),
        expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
    })
  })
  it.only('Add Transaction', () => {
    cy.getAccountByName(user, password, 'Conta para movimentacoes')
      .then(contaId => {
        cy.request({
          method: 'POST',
          headers: { Authorization: `JWT ${token}` },
          url: '/transacoes',
          body: {
            conta_id: contaId,
            data_pagamento: Cypress.dayjs().add({ days: 1 }).format('DD/MM/YYYY'),
            data_transacao: Cypress.dayjs().format('DD/MM/YYYY'),
            descricao: "desc",
            envovido: "inter",
            status: true,
            tipo: "REC",
            valor: "123"
          }
        }).as('response')
        cy.get('@response').then(res => {
          expect(res.status).to.be.equal(201)
        })
      })
  })
})