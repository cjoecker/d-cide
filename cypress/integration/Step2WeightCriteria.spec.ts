/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/').getTestElement(`Step2Button`).click();
	});

	it('moves slider', () => {
		cy
			.getTestElement(`slider0`)
			.trigger('mousedown', 'left')
			.getTestElement(`sliderText0`)
			.trigger('mouseup', { force: true })


	});


	it('shows and hides info', () => {
		cy
			.getTestElement(`WeightCriteriaInfoButton`)
			.click()

			.getTestElement('infoText')
			.contains('Weight Criteria')

			.getTestElement('infoCloseButton')
			.click()

			.getTestElement('infoText')
			.should('have.length', 0);
	});

	it('shows title', () => {
		cy.contains('Weight Criteria');
	});

	it('moves slider', () => {
		let criteriaLeft = '';
		let criteriaRight = '';

		cy
			.get(`[data-testid="slider0CriteriaLeft"]`)
			.invoke('text')
			.then(text => {
				criteriaLeft = text;
			})

			.get(`[data-testid="slider0CriteriaRight"]`)
			.invoke('text')
			.then(text => {
				criteriaRight = text;
			})

			.getTestElement(`slider0`)
			.trigger('mousedown', 'left')
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaLeft} is way more important than ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 75, 10)
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaLeft} is more important than ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 150, 10)
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaLeft} is a little more important than ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 'center')
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaLeft} is as important as ${criteriaRight}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 200, 10)
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaRight} is a little more important than ${criteriaLeft}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 260, 10)
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaRight} is more important than ${criteriaLeft}`)

			.getTestElement(`slider0`)
			.trigger('mousedown', 'right')
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})
			.contains(`${criteriaRight} is way more important than ${criteriaLeft}`)

	});

	it('moves slider to original position on server down', () => {
		let criteriaLeft = '';
		let criteriaRight = '';

		cy
			.get(`[data-testid="slider0CriteriaLeft"]`)
			.invoke('text')
			.then(text => {
				criteriaLeft = text;
			})

			.get(`[data-testid="slider0CriteriaRight"]`)
			.invoke('text')
			.then(text => {
				criteriaRight = text;
			})

			.server({ force404: true })
			.getTestElement(`slider0`)
			.trigger('mousedown', 'left')
			.getTestElement(`sliderText0`)
			.trigger('mouseup',{force: true})

			.contains(`${criteriaLeft} is as important as ${criteriaRight}`)

			.getTestElement('errorAlert')
			.should('have.length', 1)

	});
});
