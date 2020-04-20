import React from "react";
import { Provider } from "react-redux";
import { createMount } from "@material-ui/core/test-utils";
import { InputBase } from "@material-ui/core";
import store from "../../../../services/redux/store";
import EditableList from "./EditableList";
import { OptionsAndCriteriaKeys } from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import { NOT_ENOUGH_OPTIONS } from "../../../../services/Alerts";

let mount:any;
let wrapper:any;

beforeEach(() => {
	mount = createMount();

	wrapper = mount(
		<Provider store={store}>
			<EditableList
				itemsKey={OptionsAndCriteriaKeys.decisionOptions}
				notEnoughItemsAlert={NOT_ENOUGH_OPTIONS}
				hidden={false}
			/>
		</Provider>
	);
});

afterEach(() => {
	mount.cleanUp();
});



const findComponent = (value:string) => {
	return wrapper.find(`[data-testid='${value}']`).first();
};


it("allows user to write input for new item", () => {
	const inputBase = findComponent("input-base");
	const value = "New item";

	wrapper
		.find(InputBase)
		.at(0)
		.props()
		.onChange({ target: { name: "InputBase", value: value } });

	inputBase.simulate("change", {
		target: { name: "InputBase", value: value },
	});

	expect(inputBase.prop("value")).toBe(value);
});
