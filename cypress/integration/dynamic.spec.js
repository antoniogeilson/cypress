/// <reference types="cypress"/>

describe('Test with dynamic data...', () => {

  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  const foods = ['carne', 'frango', 'pizza', 'vegetariano']
  foods.forEach(food => {

    it(`A specific test with dynamic food - ${food}`, () => {
      cy.get('#formNome').type('FirstName')
      cy.get('#formSobrenome').type('LastName')
      cy.get(`[name=formSexo][value=F]`).click()
      cy.get(`[name=formComidaFavorita][value=${food}]`).click()
      cy.get('#formEscolaridade').select('Doutorado')
      cy.get('#formEsportes').select('Corrida')
      cy.get('#formCadastrar').click()
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
  })

  it.only('A specific test with dynamic food using cypress + each', () => {
    cy.get('#formNome').type('FirstName')
    cy.get('#formSobrenome').type('LastName')
    cy.get(`[name=formSexo][value=F]`).click()

    // Using Each 
    cy.get('[name=formComidaFavorita]').each($el => {
      if ($el.val() != 'vegetariano')
        cy.wrap($el).click()
    })

    cy.get('#formEscolaridade').select('Doutorado')
    cy.get('#formEsportes').select('Corrida')
    cy.get('#formCadastrar').click()
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
  })

})