/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	const firstDecisionOption = 'House 1';
	const firstSelectionCriteria = 'Size';

	//decision options
	it('creates a decision option', () => {
		addItemToList('decisionOptionsList', 'New Item');
	});
	it('edits a decision option', () => {
		editItemFromList('decisionOptionsList', 'New Item', 'Edited Item');
	});

	it("deletes decision option if it's left empty", () => {
		deleteItemWhenLeftEmpty('decisionOptionsList', firstDecisionOption);
	});

	it('deletes a decision option', () => {
		deleteItemFromList('decisionOptionsList', firstDecisionOption);
	});

	it('shows warning for not enough options', () => {
		showsWarningForNotEnoughItems('decisionOptionsList');
	});

	it('shows and hides decision options info', () => {
		showInfoDialog('decisionOptions', 'Decision Options');
	});

	it('shows decision options title', () => {
		cy.contains('Decision Options');
	});

	it("doesn't  create new decision option on server error", () => {
		ErrorOnAddItem('decisionOptionsList', 'New Item');
	});

	it('restores decision option value after edit on server error', () => {
		ErrorOnEditItem('decisionOptionsList', 'New Item', firstDecisionOption);
	});

	it("doesn't  delete decision option on server error", () => {
		ErrorOnDeleteItem('decisionOptionsList', firstDecisionOption);
	});

	//selection criteria
	it('creates a selection criteria', () => {
		addItemToList('selectionCriteriaList', 'New Item');
	});

	it('edits a decision option', () => {
		editItemFromList('selectionCriteriaList', 'New Item', 'Edited Item');
	});

	it("deletes selection criteria if it's left empty", () => {
		deleteItemWhenLeftEmpty('decisionOptionsList', firstSelectionCriteria);
	});

	it('deletes a selection criteria', () => {
		deleteItemFromList('selectionCriteriaList', firstSelectionCriteria);
	});

	it('shows warning for not enough options', () => {
		showsWarningForNotEnoughItems('selectionCriteriaList');
	});

	it('shows and hides selection criteria info', () => {
		showInfoDialog('selectionCriteria', 'Selection Criteria');
	});

	it('shows selection criteria title', () => {
		cy.contains('Selection Criteria');
	});

	it("doesn't  create new selection criteria on server error", () => {
		ErrorOnAddItem('selectionCriteriaList', 'New Item');
	});

	it('restores selection criteria value after edit on server error', () => {
		ErrorOnEditItem('selectionCriteriaList', 'New Item', firstSelectionCriteria);
	});

	it("doesn't  delete selection criteria on server error", () => {
		ErrorOnDeleteItem('selectionCriteriaList', firstSelectionCriteria);
	});

	//functions
	const addItemToList = (listName: string, itemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy
				.getTestElement('entryInput')
				.type(itemText)
				.getTestElement('addButton')
				.click()

				.getTestElement('entryInput')
				.should('have.value', '')

				.getTestElement('itemInput')
				.first()
				.should('have.value', itemText)

				.getTestElement('entryInput')
				.type(`${itemText} 1`)
				.type('{enter}')

				.getTestElement('entryInput')
				.should('have.value', '')

				.getTestElement('itemInput')
				.first()
				.should('have.value', `${itemText} 1`);
		});
	};

	const editItemFromList = (listName: string, itemText: string, newItemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy
				.getTestElement('itemInput')
				.first()
				.clear()
				.type(newItemText)
				.blur()

				.getTestElement('itemInput')
				.first()
				.should('have.value', newItemText);
		});
	};

	const deleteItemWhenLeftEmpty = (listName: string, itemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy
				.getTestElement('itemInput')
				.first()
				.clear()
				.blur()

				.getTestElement('itemInput')
				.contains(itemText)
				.should('not.exist');
		});
	};

	const deleteItemFromList = (listName: string, itemText: string) => {
		cy.getTestElement(listName).within(() => {
			cy
				.getTestElement('deleteButton0')
				.click()

				.getTestElement('itemInput')
				.contains(itemText)
				.should('not.exist');
		});
	};

	const showsWarningForNotEnoughItems = (listName: string) => {
		cy
			.getTestElement(listName)
			.within(() => {
				cy.getTestElement('itemInput').each((element, index, list) => {
					const itemIndex = list.length - index - 1;
					cy
						.getTestElement(`deleteButton${itemIndex}`)
						.click()
						.getTestElement(`deleteButton${itemIndex}`)
						.should('have.length', 0);
				});
			})
			.getTestElement('warningAlert')
			.should('have.length', 1)

			.getTestElement(listName)
			.within(() => {
				cy.getTestElement('entryInput').type('Item 1').type('{enter}');
			})
			.getTestElement('warningAlert')
			.should('have.length', 1)

			.getTestElement(listName)
			.within(() => {
				cy.getTestElement('entryInput').type('Item 2').type('{enter}');
			})

			.getTestElement('warningAlert')
			.should('have.length', 0);
	};

	const showInfoDialog = (infoName: string, title: string) => {
		cy
			.getTestElement(`${infoName}InfoButton`)
			.click()

			.getTestElement('infoText')
			.contains(title)

			.getTestElement('infoCloseButton')
			.click()

			.getTestElement('infoText')
			.should('have.length', 0);
	};

	const ErrorOnAddItem = (listName: string, itemText: string) => {
		cy
			.getTestElement(listName)
			.within(() => {
				cy
					.server({force404: true})
					.getTestElement('entryInput')
					.type(itemText)
					.getTestElement('addButton')
					.click()

					.getTestElement('entryInput')
					.should('have.value', itemText)

					.getTestElement('itemInput')
					.contains(itemText)
					.should('not.exist');
			})
			.getTestElement('errorAlert')
			.should('have.length', 1);
	};

	const ErrorOnEditItem = (listName: string, newItemText: string, initialItemText: string) => {
		cy
			.getTestElement(listName)
			.within(() => {
				cy
					.server({force404: true})
					.getTestElement('itemInput')
					.first()
					.clear()
					.type(newItemText)
					.blur()

					.getTestElement('itemInput')
					.first()
					.should('have.value', initialItemText);
			})
			.getTestElement('errorAlert')
			.should('have.length', 1);
	};

	const ErrorOnDeleteItem = (listName: string, itemText: string) => {
		cy
			.getTestElement(listName)
			.within(() => {
				cy
					.server({force404: true})
					.getTestElement('deleteButton0')
					.click()

					.getTestElement('itemInput')
					.should('have.value', itemText);
			})
			.getTestElement('errorAlert')
			.should('have.length', 1);
	};
});
