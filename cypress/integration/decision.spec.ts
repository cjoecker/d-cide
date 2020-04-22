/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	var Chance = require('chance');
	var chance = new Chance();

	beforeEach(() => {
		cy.visit('/');
	});

	it('creates a decision option', () => {
		cy.getTestElement('decisionOptionsList').within(() => {

			const newItemText = chance.sentence({words: 3})
			cy.getTestElement('entryInput').type(newItemText);
			cy.getTestElement('addButton').click();
			cy.getTestElement('itemInput0').should("have.value",newItemText);
		});
	});

	it('creates a selection criteria', () => {
		cy.getTestElement('selectionCriteriaList').within(() => {
			const newItemText = chance.sentence({words: 3})
			cy.getTestElement('entryInput').type(newItemText);
			cy.getTestElement('addButton').click();
			cy.getTestElement('itemInput0').should("have.value",newItemText);
		});
	});

});
