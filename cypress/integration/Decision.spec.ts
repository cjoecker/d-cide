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
			.get('.MuiStepIcon-completed')
			.should('have.length', 1)

			.getTestElement('NextStepButton')
			.click()
			.root()
			.should('contain', 'Rate Options')
			.get('.MuiStepIcon-completed')
			.should('have.length', 2)


			.getTestElement('NextStepButton')
			.click()
			.root()
			.should('contain', 'Decision Options Ranking')
			.and('contain', 'Selection Criteria Ranking')
			.getTestElement('NextStepButton').should("have.length", 0)
			.get('.MuiStepIcon-completed')
			.should('have.length', 3)

			.getTestElement('PrevStepButton')
			.click()
			.root()
			.should('contain', 'Rate Options')
			.get('.MuiStepIcon-completed')
			.should('have.length', 4)

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
