/// <reference types="cypress"/>


describe('Cypress basics', () => {
  it.only('Should Visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    //cy.pause()

    cy.title().should('be.equal', 'Campo de Treinamento')
    cy.title().should('contain', 'Campo').debug()

    //or 

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'Campo')


    cy.title().then(title => {
      console.log(title)
    })

  })

  it('Search element and get value', () => {

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')
  })

})
