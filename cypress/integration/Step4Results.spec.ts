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

		it('shows diagram correctly', () => {
			showsDiagramCorrectly('decisionOptions', ["House 1","House 2","House 3"])
		});

		it('wraps long labels', () => {
			wrapDiagramText('decisionOptions');
		});
	});

	describe('Selection Criteria', () => {
		it('shows and hides info', () => {
			showInfoDialog('selectionCriteria', 'Selection Criteria Ranking');
		});

		it('shows decision options title', () => {
			cy.contains('Selection Criteria Ranking');
		});

		it('shows diagram correctly', () => {
			showsDiagramCorrectly('selectionCriteria', ["Kitchen","Size","Neighborhood","Garden"])
		});

		it('wraps long labels', () => {
			wrapDiagramText('selectionCriteria');
		});
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

	const showsDiagramCorrectly = (sectionName: string, items: string[]) => {
		cy
			.getTestElement(`${sectionName}Diagram`)
			.children()
			.should('contain', '0')
			.and('contain', '2.5')
			.and('contain', '5')
			.and('contain', '7.5')
			.and('contain', '10');

		items.map(item => {
			cy.getTestElement(`${sectionName}Diagram`).children().should('contain', item);
		});

		cy.getTestElement(`${sectionName}Diagram`).within(() => {
			cy
				.get('.recharts-cartesian-grid-vertical')
				.should('have.length', 1)
				.get('.recharts-layer.recharts-yAxis')
				.should('have.length', 1)
				.get('g[class="recharts-layer recharts-bar-rectangle"]')
				.should('have.length', items.length)
				.get('text[class="recharts-text recharts-label"]')
				.should('have.length', items.length);
		});
	};
});
