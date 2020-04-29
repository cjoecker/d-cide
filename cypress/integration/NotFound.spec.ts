/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/asfdfhgj');
	});

	it('shows not found', () => {
		cy.contains("Page not found...").should("have.length", 1)
			.getTestElement('GoHomeButton')
			.click()
			.location('pathname').should('eq', '/')
	});
});
