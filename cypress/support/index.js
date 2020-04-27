Cypress.Commands.add("getTestElement", selector => {
	return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add("getTestElementStartingWith", selector => {
	return cy.get(`[data-testid^="${selector}"]`);
});

