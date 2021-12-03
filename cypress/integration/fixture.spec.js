/// <reference types="cypress"/>

describe('Fixture Tests', () => {
  it('Getting data from fixture file', function () {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    //Getting Data from UserData File
    cy.fixture('userData').as('usuario').then(() => {
      cy.get('#formNome').type(this.usuario.firstName)
      cy.get('#formSobrenome').type(this.usuario.lastName)
      cy.get(`[name=formSexo][value=${this.usuario.sex}]`).click()
      cy.get('#formEscolaridade').select(this.usuario.study)
      cy.get('#formEsportes').select(this.usuario.sports)
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
  })

  it('Getting data from fixture file + CommandsJSValidation', function () {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    //Getting Data from UserData File
    cy.fixture('userData').as('usuario').then(() => {
      cy.get('#formNome').type(this.usuario.firstName)
      cy.get('#formSobrenome').type(this.usuario.lastName)
      cy.get(`[name=formSexo][value=${this.usuario.sex}]`).click()
      cy.get('#formEscolaridade').select(this.usuario.study)
      cy.get('#formEsportes').select(this.usuario.sports)
      cy.get('#formCadastrar').click()

      //Using Command (CommandJS)
      cy.checkMessage('#resultado > :nth-child(1)', 'Cadastrado!')

    })
  })
})
