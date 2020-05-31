/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	it.only('Has no detectable accessibility violations on load', () => {
		cy.visit('/');
		cy.injectAxe();
		cy.checkA11y('', Cypress.env('A11Y_RULES'));

		cy.viewport('iphone-6').visit('/');
		cy.injectAxe();
		cy.checkA11y('', Cypress.env('A11Y_RULES'));

		cy.getTestElement('privacyPolicyLink').click();
		cy.checkA11y('', Cypress.env('A11Y_RULES'));
	});

	it('shows cookie banner on desktop', () => {
		cy
			.visit('/')
			.getTestElement('cookiesConsent')
			.contains('Cookie Consent')

			.getTestElement('cookieConsentCloseButton')
			.click()

			.getTestElement('cookiesConsent')
			.should('have.length', 0)

			.reload()
			.getTestElement('cookiesConsent')
			.should('have.length', 0);
	});

	it('shows cookie dialog on mobile', () => {
		cy
			.viewport('iphone-6')
			.visit('/')
			.getTestElement('cookiesConsent')
			.contains('Cookie Consent')

			.getTestElement('cookieConsentCloseButton')
			.click()

			.getTestElement('cookiesConsent')
			.should('have.length', 0)

			.reload()
			.getTestElement('cookiesConsent')
			.should('have.length', 0);
	});

	it('redirects to cjoecker', () => {
		window.localStorage.setItem('cookieConsentAccepted', 'true');
		cy.visit('/').getTestElement('cjoeckerLink').should('have.attr', 'href', 'https://www.cjoecker.de/');
	});

	it('shows privacy policy', () => {
		window.localStorage.setItem('cookieConsentAccepted', 'true');
		cy
			.visit('/')
			.getTestElement('privacyPolicyLink')
			.click()

			.getTestElement('infoText')
			.contains('Privacy Policy')

			.getTestElement('infoCloseButton')
			.click()

			.getTestElement('infoText')
			.should('have.length', 0);
	});

	it('persist changes', () => {
		const changedItemText = 'New item text';

		cy
			.visit('/')

			.getTestElement('decisionOptionsList')
			.within(() => {
				cy
					.getTestElement('itemInput')
					.first()
					.clear()
					.type(changedItemText)
					.blur()

					.getTestElement('itemInput')
					.first()
					.should('have.value', changedItemText);
			})

			.visit('/')
			.getTestElement('decisionOptionsList')
			.within(() => {
				cy.getTestElement('itemInput').first().should('have.value', changedItemText);
			});
	});
});
