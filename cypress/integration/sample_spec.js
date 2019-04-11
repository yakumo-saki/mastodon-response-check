/// <reference types="Cypress" />

describe('My First Test', function() {
	it('Does not do much!', function() {
	  expect(true).to.equal(true)
	})
})

describe('Real test', function() {
	it('Visits the login page', function() {
    cy.visit(Cypress.env('url'))
    // cy.visit("/login")

	  cy.get('#text')
		.type(Cypress.env('username'))
		.should('have.value', Cypress.env('username'))

		cy.contains('送信').click()

	  cy.get('#password')
		.type(Cypress.env('password'))
		.should('have.value', Cypress.env('password'))

		cy.get('#termsSubmitBtn input[type="submit"]').click()
		
		cy.get('div.bonus div.bonusGet')
			.click()

		cy.get('div.bonusArea > span.coinNum')
			.should('not.be.empty')

	})
})

