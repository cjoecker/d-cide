/// <reference types="cypress" />
/* eslint-disable no-undef*/


context('Actions', () => {
	beforeEach(() => {
		cy.visit("/")
	})

	it('creates a decision option', () => {
		cy.find('[data-cy="decisionOptionsList"]').should('have.length', 1)
	})
})