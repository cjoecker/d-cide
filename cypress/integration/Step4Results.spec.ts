/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/').getTestElement(`Step4Button`).click();
	});

	describe('Decision Options', () => {
		it('shows and hides info', () => {
			showInfoDialog('decisionOptions', 'Decision Options Ranking');
		});

		it('shows decision options title', () => {
			cy.contains('Decision Options Ranking');
		});

		it.only('shows diagram correctly', () => {
			cy
				.getTestElement('decisionOptionsDiagram')
				.children()
				.should('contain', '0')
				.and('contain', '2.5')
				.and('contain', '5')
				.and('contain', '7.5')
				.and('contain', '10')

				.and('contain', 'House 1')
				.and('contain', 'House 2')
				.and('contain', 'House 3')

				.get('[name="House 3"]')
				.should('have.length', 1)
				.get('[name="House 2"]')
				.should('have.length', 1)
				.get('[name="House 1"]')
				.should('have.length', 1);

			cy.getTestElement('decisionOptionsDiagram').within(() => {
				cy.get('.recharts-cartesian-grid-vertical').should('have.length', 1);
				cy.get('.recharts-layer.recharts-yAxis').should('have.length', 1);
			});
		});

		it('wraps long labels', () => {
			wrapDiagramText('decisionOptions');
		});

		const showInfoDialog = (infoName: string, title: string) => {
			cy
				.getTestElement(`${infoName}ResultsInfoButton`)
				.click()

				.getTestElement('infoText')
				.contains(title)

				.getTestElement('infoCloseButton')
				.click()

				.getTestElement('infoText')
				.should('have.length', 0);
		};

		const wrapDiagramText = (sectionName: string) => {
			cy
				.getTestElement(`Step1Button`)
				.click()
				.getTestElement(`${sectionName}List`)
				.within(() => {
					cy.getTestElement('entryInput').type('12345678901234567890').type('{enter}');
				})
				.getTestElement(`Step4Button`)
				.click()

				.getTestElement(`${sectionName}Diagram`)
				.contains(/1234567890123-(\n)*4567890/);
		};
	});
});
