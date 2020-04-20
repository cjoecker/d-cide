import React from "react";
import { Provider } from "react-redux";
import { InputBase } from "@material-ui/core";
import store from "../../../../services/redux/store";
import EditableList from "./EditableList";
import { OptionsAndCriteriaKeys } from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import { NOT_ENOUGH_OPTIONS } from "../../../../services/Alerts";
import { MemoryRouter } from "react-router-dom";
import { createMount } from "@material-ui/core/test-utils";

let mount: any;
let wrapper: any;

beforeEach(() => {
	mount = createMount();

	wrapper = mount(
		<MemoryRouter initialEntries={['/decisions/1']}>
				<Provider store={store}>
					<EditableList
						itemsKey={OptionsAndCriteriaKeys.decisionOptions}
						notEnoughItemsAlert={NOT_ENOUGH_OPTIONS}
						hidden={false}
					/>
				</Provider>
		</MemoryRouter>
	);
});

const findComponent = (value: string) => {
	return wrapper.find(`[data-testid='${value}']`).first();
};

it('allows user to write input for new item', () => {
	const inputBase = findComponent('input-base');

	const value = 'New item';


	wrapper
		.find(InputBase)
		.childAt(0)
		.props()
		.onChange({
				target: {name: 'InputBase', value},
			});

	// inputBase.simulate('change', {
	// 	target: {name: 'InputBase', value},
	// });
	console.log(inputBase.prop("value"));

	expect(inputBase.prop('value')).toBe(value);
});
