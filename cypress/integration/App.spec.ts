/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/asfdfhgj');
	});

	it('redirects to main page on logo click', () => {
		cy.getTestElement('d-cideLogo')
			.click()
			.location('pathname').should('eq', '/')
	});
});
