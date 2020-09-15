/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Instructions Box', () => {
  beforeEach(() => {
    window.localStorage.setItem('cookieConsentAccepted', 'true');
    cy.visit('/');
  });

  it('shows instructions', () => {
    cy.contains('Add here the options you want to decide for.');

    cy.getTestElement('decisionOptionsList').within(() => {
      cy.getTestElement('entryInput').type('Option 1');
      cy.contains('Click here or press enter to add your entry.');
      cy.getTestElement('addButton').click();
      cy.contains('Add at least another decision option.');
      cy.getTestElement('entryInput').type('Option 2').getTestElement('addButton').click();
    });

    cy.contains('Add here the criteria you must consider for your decision.');

    cy.getTestElement('selectionCriteriaList').within(() => {
      cy.getTestElement('entryInput').type('Criteria 1').getTestElement('addButton').click();
      cy.contains('Add at least another criteria.');
      cy.getTestElement('entryInput').type('Criteria 2').getTestElement('addButton').click();
    });

    cy.contains('Click here go to the next step.');

    cy.getTestElement('NextStepButton').click();
    cy.contains('Move the slider right or left');

    cy.getTestElement(`slider0`)
      .trigger('mousedown', 'left')
      .getTestElement(`infoTextSlider0`)
      .trigger('mouseup', {force: true});
    cy.contains('Go to next step after you weighted every criteria.');

    cy.getTestElement('NextStepButton').click();
    cy.contains('How good or bad is the');

    cy.getTestElement(`slider00`).trigger('mousedown', 'left').trigger('mouseup', {force: true});
    cy.contains('Go to next step after you rated every decision option.');

    cy.getTestElement('NextStepButton').click();
    cy.contains('is the best decision option for you');
    cy.contains('The most important criteria for your decision is');
  });

  it('hides instructions', () => {
    cy.contains('Add here the options you want to decide for.');
    cy.getTestElement('hideHelp').click();
    cy.contains('Add here the options you want to decide for.').should('not.exist');
    cy.visit('/');
    cy.contains('Add here the options you want to decide for.');
  });

  it('hides instructions permanently', () => {
    cy.contains('Add here the options you want to decide for.');
    cy.getTestElement('dontShowMoreHelp').click();
    cy.contains('Add here the options you want to decide for.').should('not.exist');
    cy.visit('/');
    cy.contains('Add here the options you want to decide for.').should('not.exist');
  });
});
