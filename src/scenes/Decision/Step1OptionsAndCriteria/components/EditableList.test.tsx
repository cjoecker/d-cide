import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import EditableList from "./EditableList";
import { OptionsAndCriteriaKeys } from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import { NOT_ENOUGH_OPTIONS } from "../../../../services/Alerts";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRoute } from "../../../../services/testRender";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getByTestId: any;
const decisionId = 1;
jest.mock('axios');

beforeEach(() => {
	(axios.get as jest.Mock).mockResolvedValueOnce({
		data: [{
			id: 56,
			name: "Existing Option 1",
			score: 99,
		}],
	});

	getByTestId = renderWithRoute(
		<EditableList
			itemsKey={OptionsAndCriteriaKeys.decisionOptions}
			notEnoughItemsAlert={NOT_ENOUGH_OPTIONS}
			hidden={false}
		/>,'/decisions/:decisionId',{param: "decisionId", value: "1"}).getByTestId


});

it('writes a new entry', () => {
	const newEntryInput = getByTestId('entryInput');
	const newEntryValue = "New Option"

	expect(newEntryInput).toBeInTheDocument();
	expect(newEntryInput).toHaveValue('');

	fireEvent.change(newEntryInput, {target: {value: newEntryValue}});
	expect(newEntryInput).toHaveValue(newEntryValue);
});


test('creates a new item with add button', async () => {
	const newEntryInput = getByTestId('entryInput');
	const addButton = getByTestId('addButton');
	const newEntryValue = "New Option";

	(axios.post as jest.Mock).mockResolvedValueOnce({
		data: {
			id: 56,
			name: newEntryValue,
			score: 99,
		},
	});

	fireEvent.change(newEntryInput, {target: {value: newEntryValue}});
	fireEvent.click(addButton);

	await waitFor(() => expect(getByTestId("itemInput0")).toHaveValue(newEntryValue))

	expect(axios.post as jest.Mock).toHaveBeenCalledTimes(1);
	expect(axios.post as jest.Mock).toHaveBeenCalledWith(`/api/decisions/${decisionId}/${OptionsAndCriteriaKeys.decisionOptions}/`, {name: newEntryValue});
});


