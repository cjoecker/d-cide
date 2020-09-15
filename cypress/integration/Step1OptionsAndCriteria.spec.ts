/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
  beforeEach(() => {
    window.localStorage.setItem('cookieConsentAccepted', 'true');
    cy.visit('/');
  });

  const firstDecisionOption = 'Invest in gold';
  const firstSelectionCriteria = 'Risks';

  describe('Decision Options', () => {
    const listName = 'decisionOptionsList';

    it('creates a decision option', () => {
      addItemToList(listName, 'New Item');
    });
    it('edits a decision option', () => {
      editItemFromList(listName, 'New Item', 'Edited Item');
    });

    it("deletes decision option if it's left empty", () => {
      deleteItemWhenLeftEmpty(listName, firstDecisionOption);
    });

    it('deletes a decision option', () => {
      deleteItemFromList(listName, firstDecisionOption);
    });

    it('shows warning for not enough options', () => {
      showsWarningForNotEnoughItems(listName);
    });

    it('shows and hides decision options info', () => {
      showInfoDialog('decisionOptions', 'Decision Options');
    });

    it('shows decision options title', () => {
      cy.contains('Decision Options');
    });
  });

  describe('Selection Criteria', () => {
    const listName = 'selectionCriteriaList';

    it('creates a selection criteria', () => {
      addItemToList(listName, 'New Item');
    });

    it('edits a decision option', () => {
      editItemFromList(listName, 'New Item', 'Edited Item');
    });

    it("deletes selection criteria if it's left empty", () => {
      deleteItemWhenLeftEmpty(listName, firstSelectionCriteria);
    });

    it('deletes a selection criteria', () => {
      deleteItemFromList(listName, firstSelectionCriteria);
    });

    it('shows warning for not enough options', () => {
      showsWarningForNotEnoughItems(listName);
    });

    it('shows and hides selection criteria info', () => {
      showInfoDialog('selectionCriteria', 'Selection Criteria');
    });

    it('shows selection criteria title', () => {
      cy.contains('Selection Criteria');
    });
  });

  //functions
  const addItemToList = (listName: string, itemText: string) => {
    cy.getTestElement(listName).within(() => {
      cy.getTestElement('entryInput')
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
      cy.getTestElement('itemInput')
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
      cy.getTestElement('itemInput')
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
      cy.getTestElement('deleteButton0')
        .click()

        .getTestElement('itemInput')
        .contains(itemText)
        .should('not.exist');
    });
  };

  const showsWarningForNotEnoughItems = (listName: string) => {
    cy.getTestElement(listName)
      .within(() => {
        cy.getTestElement('itemInput').each((element, index, list) => {
          const itemIndex = list.length - index - 1;
          cy.getTestElement(`deleteButton${itemIndex}`)
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
      .getTestElement('NextStepButton')
      .should('be.disabled')
      .getTestElement('Step2Button')
      .should('be.disabled')
      .getTestElement('Step3Button')
      .should('be.disabled')
      .getTestElement('Step4Button')
      .should('be.disabled')

      .getTestElement(listName)
      .within(() => {
        cy.getTestElement('entryInput').type('Item 2').type('{enter}');
      })

      .getTestElement('warningAlert')
      .should('have.length', 0)
      .getTestElement('NextStepButton')
      .should('not.be.disabled')
      .getTestElement('Step2Button')
      .should('not.be.disabled')
      .getTestElement('Step3Button')
      .should('not.be.disabled')
      .getTestElement('Step4Button')
      .should('not.be.disabled');
  };

  const showInfoDialog = (infoName: string, title: string) => {
    cy.getTestElement(`${infoName}InfoButton`)
      .click()

      .getTestElement('infoText')
      .contains(title)

      .getTestElement('infoCloseButton')
      .click()

      .getTestElement('infoText')
      .should('have.length', 0);
  };
});
