/// <reference types="cypress"/>
var dayjs = require('dayjs')
dayjs().format()

describe('Test with API dynamic data...', () => {
  let user = 'antonio@antonio.com'
  let password = '12345'
  let accountName = 'Account_Antonio'
  let accountNameUpdated = 'Account_Antonio_Updated'

  before(() => {
    cy.getToken(user, password)
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

  it('Create a new account', () => {
    cy.request({
      method: 'POST',
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
    cy.getAccountByName(user, password, 'Conta para alterar')
      .then(contaId => {
        cy.request({
          method: 'PUT',
          url: `/contas/${contaId}`,
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

  it('Add Transaction', () => {
    cy.getAccountByName(user, password, 'Conta para movimentacoes')
      .then(contaId => {
        cy.request({
          method: 'POST',
          url: '/transacoes',  
          body: {
            conta_id: contaId,
            data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
            data_transacao: dayjs().format('DD/MM/YYYY'),
            descricao: "desc",
            envolvido: "inter",
            status: true,
            tipo: "REC",
            valor: "123"
          }
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
      })
  })

  it('Check Balance', () => {
    cy.getAccountByName(user, password, 'Conta para saldo')
      .then(contaId => {
        cy.request({
          method: 'GET',
          url: '/saldo'
        })
          .then(res => {
            let balance = null
            res.body.forEach(b => {
              if (b.conta_id === contaId) balance = b.saldo
            })
            expect(balance).to.be.equal('534.00')
          })
      })
  })
})