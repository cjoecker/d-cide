/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('changes step with arrow buttons', () => {
		cy
			.getTestElement('NextStepButton')
			.click()
			.root()
			.should('contain', 'Weight Criteria')

			.getTestElement('NextStepButton')
			.click()
			.root()
			.should('contain', 'Rate Options')

			.getTestElement('NextStepButton')
			.click()
			.root()
			.should('contain', 'Decision Options Ranking')
			.and('contain', 'Selection Criteria Ranking')
			.getTestElement('NextStepButton').should("have.length", 0)

			.getTestElement('PrevStepButton')
			.click()
			.root()
			.should('contain', 'Rate Options')

			.getTestElement('PrevStepButton')
			.click()
			.root()
			.should('contain', 'Weight Criteria')

			.getTestElement('PrevStepButton')
			.click()
			.root()
			.should('contain', 'Decision Options')
			.and('contain', 'Selection Criteria')
			.getTestElement('PrevStepButton').should("have.length", 0)
	});
});
