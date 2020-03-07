import React from 'react';
import {Provider} from "react-redux";
import EditableList from "./EditableList";
import store from "../../../../store";
import {createMount, createShallow} from "@material-ui/core/test-utils";
import {InputBase} from "@material-ui/core";


let mount;
let wrapper;

beforeEach(() => {
    mount = createMount();

    wrapper = mount(
        <Provider store={store}>
            <EditableList/>
        </Provider>
    );
});

afterEach(() => {
    mount.cleanUp();
});

const findComponent = ( value) => {
  return wrapper.find(`[data-testid='${value}']`).first();
};

it('allow user to write input for new item', () => {

    const inputBase = findComponent('input-base');
    const value = "New item";

    wrapper.find(InputBase).at(0).props().onChange({target: {name: 'InputBase', value: value}});

    inputBase.simulate('change', {target: {name: 'InputBase', value: value}});

    expect(inputBase.prop('value')).toBe(value);

    console.log(inputBase.prop('value'));

});

