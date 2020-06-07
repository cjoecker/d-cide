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

	it.only('toggles dark mode', () => {
		window.localStorage.setItem('darkModeActive', 'true');
		cy
			.visit('/')
			.get('[data-testid=cookiesConsent] > .MuiPaper-root')
			.should('have.css', 'color', 'rgb(207, 207, 207)')

			.getTestElement('darkModeButton')
			.click()

			.get('[data-testid=cookiesConsent] > .MuiPaper-root')
			.should('have.css', 'color', 'rgb(61, 61, 61)')

			.reload()

			.get('[data-testid=cookiesConsent] > .MuiPaper-root')
			.should('have.css', 'color', 'rgb(61, 61, 61)')

			.getTestElement('darkModeButton')
			.click()

			.get('[data-testid=cookiesConsent] > .MuiPaper-root')
			.should('have.css', 'color', 'rgb(207, 207, 207)');
	});
});
