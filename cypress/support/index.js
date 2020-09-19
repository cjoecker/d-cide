/* eslint-disable no-undef*/
// eslint-disable-next-line import/no-extraneous-dependencies

Cypress.Commands.add('getTestElement', selector => {
	return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('getTestElementStartingWith', selector => {
	return cy.get(`[data-testid^="${selector}"]`);
});

Cypress.Commands.add('setInitialState', () => {
	window.localStorage.setItem('cookieConsentAccepted', 'true');

	//Initial decision options: Invest in gold, Invest in shares, Invest in real state
	//Initial selection criteria: Risks, Long term profit, Short term profit, Monthly cash flow
	window.localStorage.setItem(
		'appState',
		'U2FsdGVkX1+3OSVNnThToiQ/JcSMwPBl3KZoIEuY/DDzTqtvx4N5BXnOM1Jjd9UD+PblIwS4Hq1sFJVB8btoy6BQFx4P/k9j8nekKjDLJSVEEsKDpLzEdShbgA3JtQE3HY5RYlAbLcTz5Yh25yPCycV4UzV7RaZVDZ5QbsXInob7n3L6fNgBUGFVWIi3CWb7ZH+BJllsmjYdzYsB7b5It1QTvUQrQOWvbCsl3BWgbN+lIAtzM2bM6ZJCUJ3swpDZtKVn7v6ek4mWjwa9KHyVu4dhYpThLqMPw1f5907ubvjBzXGxDvvaHfQKaD0WmFDuqT9EW9u4y3Xqy4zY+2keR5wOvNggwntKmZPBhZAvbGeyfaAxzbZX5st8lKu+kgGH3ohxS184BtaSEnKmg94hew5RtOHW0m6GuNXu/R+XAz5hu7132/Hei/1B3NZFIjhn4N6+hKItNnwcBVfLPowKeYUZX4/hXG3MYmCGC9GgV40tInFsepvl8NQJwp3XrH5bgWiEuyDy5ZuyC6z6sWPzowJqkTFz5lAwW0kfd77UUESoitz+Q9+vmdDhHt8S/xpVMKgvNWLDhuQggizyAg3iH8Rc4jP4JJm9xqzRxAEAmDgf07JPCJN1cH7aN29z/ZPgfkPwBFOBq2OrArfm4nE4DEeCIdgty0Fb8KOqfV19HAw='
	);
});
