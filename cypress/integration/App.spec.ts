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
});
