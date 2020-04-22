Cypress.Commands.add("getTestElement", selector => {
	return cy.get(`[data-testid="${selector}"]`);
});
