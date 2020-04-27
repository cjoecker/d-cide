/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/').getTestElement(`Step3Button`).click();
	});

	//TODO Test API call on slider change after cypress issue is solved
	// Code is in commit 0955a32C
	// https://github.com/cypress-io/cypress/issues/1570

	it('shows and hides info', () => {
		cy
			.getTestElement(`RateOptionsInfoButton`)
			.click()

			.getTestElement('infoText')
			.contains('Rate Options')

			.getTestElement('infoCloseButton')
			.click()

			.getTestElement('infoText')
			.should('have.length', 0);
	});

	it('shows title', () => {
		cy.contains('Rate Options');
	});

	it('shows sliders', () => {
		cy.getTestElementStartingWith(`slider`).should('have.length', 12);
	});

});
