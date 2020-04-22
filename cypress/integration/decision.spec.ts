/// <reference types="cypress" />
/* eslint-disable no-undef*/


context('Actions', () => {
	beforeEach(() => {
		cy.visit("/")
	})

	it('creates a decision option', () => {
		cy.get('[data-test-id="decisionOptionsList"]').should('have.length', 1)
	})
})