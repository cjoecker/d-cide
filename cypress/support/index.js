/* eslint-disable no-undef*/
// eslint-disable-next-line import/no-extraneous-dependencies

Cypress.Commands.add('getTestElement', selector => {
	return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('getTestElementStartingWith', selector => {
	return cy.get(`[data-testid^="${selector}"]`);
});
