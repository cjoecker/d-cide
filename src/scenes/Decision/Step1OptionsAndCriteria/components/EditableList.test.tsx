import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import store from "../../../../services/redux/store";
import EditableList from "./EditableList";
import { OptionsAndCriteriaKeys } from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import { NOT_ENOUGH_OPTIONS } from "../../../../services/Alerts";
import "@testing-library/jest-dom/extend-expect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getByTestId: any;



beforeEach(() => {
	getByTestId = render(
		<MemoryRouter initialEntries={['/decisions/1']}>
			<Provider store={store}>
				<EditableList
					itemsKey={OptionsAndCriteriaKeys.decisionOptions}
					notEnoughItemsAlert={NOT_ENOUGH_OPTIONS}
					hidden={false}
				/>
			</Provider>
		</MemoryRouter>
	).getByTestId;
});

it('is possible to write new entry', () => {
	const entryInput = getByTestId('entryInput');

	expect(entryInput).toBeInTheDocument();
	expect(entryInput).toHaveValue('');

	fireEvent.change(entryInput, {target: {value: 'hola'}});
	expect(entryInput).toHaveValue('hola');
});
