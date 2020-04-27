// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Custom command to select DOM element by data-cy attribute.
		 * @example cy.dataCy('greeting')
		 */
		getTestElement(value: string): Chainable<Subject>
		getTestElementStartingWith(value: string): Chainable<Subject>
	}
}