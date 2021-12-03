/// <reference types="cypress"/>

describe('Tests', () => {

  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  describe('Working with Text', () => {

    it('Getting a content on body', () => {
      cy.get('body')
        .should('contain', 'Cuidado')
    })

    it('Getting a content on span', () => {
      cy.get('span')
        .should('contain', 'Cuidado')
    })

    it('Getting a content in a class', () => {
      cy.get('.facilAchar')
        .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })
  })

  describe('Working with Links', () => {

    it('Clicking on href value', () => {
      cy.get('[href="#"]').click()
      cy.get('#resultado').should('have.text', 'Voltou!')

      cy.reload()
      cy.get('#resultado').should('have.not.text', 'Voltou!')
      cy.contains('Voltar').click()
      cy.get('#resultado').should('contain', 'Voltou!')
    })
  })

  describe('Working with TextField', () => {

    it('TextField', () => {
      cy.get('#formNome').type('Cypress Test')
        .should('have.value', 'Cypress Test')
    })

    it('TextArea', () => {
      cy.get('#elementosForm\\:sugestoes')
        .type('Cypress Test Area')
        .should('have.value', 'Cypress Test Area')
    })

    it('Input with levels of child', () => {
      cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
        .type('12345', { delay: 100 })
        .should('have.value', '12345')
    })
  })

  describe('RadioButton', () => {

    it('RadioButton', () => {
      cy.get('#formSexoFem')
        .click()
        .should('be.checked')

      cy.get('#formSexoMasc')
        .should('not.be.checked')
    })

    it('RadioButton + Searching for a specific element property ', () => {
      cy.get("[name='formSexo']").should('have.length', 2)

    })
  })

  describe('Checkbox multi-values', () => {

    it('All Checkboxes are checked', () => {
      cy.get('[name=formComidaFavorita]').click({ multiple: true })
      cy.get('#formComidaCarne').should('be.checked')
      cy.get('#formComidaFrango').should('be.checked')
      cy.get('#formComidaPizza').should('be.checked')
      cy.get('#formComidaVegetariana').should('be.checked')

    })
  })

  describe('ComboBox Tests', () => {

    it('Selecting 1 value on Combobox', () => {
      cy.get('[data-test=dataEscolaridade]')
        .select('Superior')
        .should('have.value', 'superior')

      // Checking Total of Items on ComboBox  
      cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)

      // Getting ComboBox values and adding on array + Assert
      cy.get('[data-test=dataEscolaridade] option').then($arr => {
        const values = []
        $arr.each(function () {
          values.push(this.innerHTML)
        })
        expect(values).to.include.members(["Superior", "Mestrado"])
      })
    })
    it.only('ComboBox with Multi-Values', () => {

      cy.get('[data-testid=dataEsportes]')
        .select(['natacao', 'Corrida'])

      // Getting Value using Jquery + Assert
      cy.get('[data-testid=dataEsportes]').then($el => {
        expect($el.val()).to.be.deep.equal(['natacao', 'Corrida'])
        expect($el.val()).to.have.length(2)
      })

      // or 

      cy.get('[data-testid=dataEsportes]')
        .invoke('val')
        .should('eql', ['natacao', 'Corrida'])
    })
  })
})
