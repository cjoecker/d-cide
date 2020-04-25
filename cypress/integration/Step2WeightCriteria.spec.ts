/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/')
			.getTestElement( `Step2Button`)
			.click()
	});

	//decision options
	it('shows and hides info', () => {
		cy.getTestElement( `WeightCriteriaInfoButton`)
			.click()

			.getTestElement('infoText')
			.contains("Weight Criteria")

			.getTestElement('infoCloseButton')
			.click()

			.getTestElement('infoText')
			.should('have.length',0);
	});

	it('shows title', () => {
		cy.contains("Weight Criteria")
	});

});
