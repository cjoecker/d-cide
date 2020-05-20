/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
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

	it.only('redirects to cjoecker', () => {
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
});
