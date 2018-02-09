import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import {
    shallow,
    configure
} from 'enzyme';

import DataLine from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('DataLine component should exist', t => {
    const wrapper = shallow(<DataLine cells={[]} />);

    t.true(wrapper.exists());
});

test('props should be assigned', t => {
    const cells = [
        {
            displayValue: 'first cell',
            columnId: 'cell-1',
            cssClass: 'multiline',
            display: true,
            readOnly: true,
            isEdited: false,
            lastEditable: false,
            options: [],
            validate: (value) => undefined
        },
        {
            displayValue: 'second cell',
            columnId: 'cell-2',
            cssClass: 'multiline',
            display: true,
            readOnly: false,
            isEdited: true,
            lastEditable: false,
            options: [],
            validate: (value) => undefined
        }
    ];

    // Handlers
    const sgleClickHandler = () => { };
    const dbleClickHandler = () => { };
    const cellEditHandler = (key, value) => { };
    const enterPressHandler = () => { };
    const tabOnLastCellCallback = () => { };

    // Spies
    const spySgleClick = sinon.spy(sgleClickHandler);
    const spyDbleClick = sinon.spy(dbleClickHandler);
    const spycellEdit = sinon.spy(cellEditHandler);
    const spyEnterPress = sinon.spy(enterPressHandler);
    const spyTabOnLastCell = sinon.spy(tabOnLastCellCallback);

    const wrapper = shallow(
        <DataLine cells={cells}
            sgleClickHandler={spySgleClick}
            dbleClickHandler={spyDbleClick}
            cellEditHandler={spycellEdit}
            enterPressHandler={spyEnterPress}
            tabOnLastCellCallback={spyTabOnLastCell}
            editMode={true}
            isNew={true}
            style={{ padding: 5 }}
            cssClass='padded'
        />
    );

    t.true(wrapper.hasClass('padded card-item inline-item dg-new-line'));
    t.deepEqual(wrapper.prop('style'), { padding: 5 });

    // Click event
    wrapper.simulate('click');
    wrapper.simulate('dblclick');
    t.true(spySgleClick.called);
    t.true(spyDbleClick.called);

    // Cells test

    // First cell
    t.true(wrapper.childAt(0).hasClass('card-item-content'));
    t.is(wrapper.childAt(0).childAt(0).prop('displayValue'), 'first cell');
    t.is(wrapper.childAt(0).childAt(0).prop('columnId'), 'cell-1');
    t.is(wrapper.childAt(0).childAt(0).prop('cssClass'), 'multiline');
    t.is(wrapper.childAt(0).childAt(0).prop('displayTemplate'), undefined);
    t.not(wrapper.childAt(0).childAt(0).prop('editCallback'), undefined);
    t.not(wrapper.childAt(0).childAt(0).prop('enterPressCallback'), undefined);
    t.is(wrapper.childAt(0).childAt(0).prop('editMode'), true);
    t.is(wrapper.childAt(0).childAt(0).prop('readOnly'), true);
    t.is(wrapper.childAt(0).childAt(0).prop('isEdited'), false);
    t.deepEqual(wrapper.childAt(0).childAt(0).prop('options'), []);
    t.not(wrapper.childAt(0).childAt(0).prop('validate'), undefined);
    t.not(wrapper.childAt(0).childAt(0).prop('tabOnLastCellCallback'), undefined);

    // Second cell
    t.true(wrapper.childAt(0).hasClass('card-item-content'));
    t.is(wrapper.childAt(0).childAt(1).prop('displayValue'), 'second cell');
    t.is(wrapper.childAt(0).childAt(1).prop('columnId'), 'cell-2');
    t.is(wrapper.childAt(0).childAt(1).prop('cssClass'), 'multiline');
    t.is(wrapper.childAt(0).childAt(1).prop('displayTemplate'), undefined);
    t.not(wrapper.childAt(0).childAt(1).prop('editCallback'), undefined);
    t.not(wrapper.childAt(0).childAt(1).prop('enterPressCallback'), undefined);
    t.is(wrapper.childAt(0).childAt(1).prop('editMode'), true);
    t.is(wrapper.childAt(0).childAt(1).prop('readOnly'), false);
    t.is(wrapper.childAt(0).childAt(1).prop('isEdited'), true);
    t.deepEqual(wrapper.childAt(0).childAt(1).prop('options'), []);
    t.not(wrapper.childAt(0).childAt(1).prop('validate'), undefined);
    t.not(wrapper.childAt(0).childAt(1).prop('tabOnLastCellCallback'), undefined);
});