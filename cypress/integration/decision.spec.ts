/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {

	beforeEach(() => {
		cy.visit('/');
	});

	it('creates a decision option', () => {
		addItemToList('decisionOptionsList', "New Item");
	});
	it('edits a decision option', () => {
		const listName = 'decisionOptionsList';
		const itemText = "New Item";
		const newItemText = "Edited Item";
		addItemToList(listName, itemText);
		editItemFromList(listName, itemText, newItemText);
	});

	it('deletes a decision option', () => {
		const listName = 'decisionOptionsList';
		const newItemText = "New Item";
		addItemToList(listName, newItemText);
		deleteItemFromList(listName, newItemText);
	});

	it('creates a selection criteria', () => {
		addItemToList('selectionCriteriaList', "New Item");
	});

	it('edits a decision option', () => {
		const listName = 'selectionCriteriaList';
		const itemText = "New Item";
		const newItemText = "Edited Item";
		addItemToList(listName, itemText);
		editItemFromList(listName, itemText, newItemText);
	});

	it('deletes a selection criteria', () => {
		const listName = 'selectionCriteriaList';
		const newItemText = "New Item";
		addItemToList(listName, newItemText);
		deleteItemFromList(listName, newItemText);
	});

	const addItemToList = (listName: string, itemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy.getTestElement('entryInput').type(itemText);
			cy.getTestElement('addButton').click();
			cy.getTestElement('itemInput0').should('have.value', itemText);
		});
	};

	const editItemFromList = (listName: string, itemText: string, newItemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy.getTestElement('itemInput0').should('have.value', itemText);
			cy.getTestElement('itemInput0').clear().type(newItemText).blur();
			cy.getTestElement('itemInput0').should('have.value', newItemText);
		});
	};

	const deleteItemFromList = (listName: string, itemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy.getTestElement('deleteButton0').click();
			cy.getTestElement('itemInput0').should('not.have.value', itemText);
		});
	};
});
