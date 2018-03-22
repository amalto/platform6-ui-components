import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import TogglePanel from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('TogglePanel component should exist', t => {
    const wrapper = shallow(
        <TogglePanel panelTitle='Panel header'
            defaultOpened={true}
        >
            TogglePanel content
        </TogglePanel>
    );

    t.true(wrapper.exists());
});

test('TogglePanel props should be defined', t => {
    const toggleCallback = (opened) => { };
    const cancelAction = () => { };
    const submitAction = () => { };
    const spy = sinon.spy(toggleCallback);
    const cancelSpy = sinon.spy(cancelAction);
    const submitSpy = sinon.spy(submitAction);
    const wrapper = shallow(
        <TogglePanel panelTitle='Panel header'
            defaultOpened={true}
            hideTitle={false}
            togglable={true}
            toggleCallback={spy}
            showSpinner={true}
            leftCustomControls={<div>Left</div>}
            rightCustomControls={<div>Right</div>}
            cancelBtn={{
                label: 'Cancel',
                action: cancelSpy,
                cssClass: 'btn btn-trans btn-default'
            }}
            submitBtn={{
                label: 'Submit',
                action: submitSpy,
                cssClass: 'btn btn-trans btn-warning'
            }}
            customStyle={{ padding: 5 }}
        >
            TogglePanel content
        </TogglePanel>
    );

    t.true(wrapper.hasClass('panel panel-default'));
    t.deepEqual(wrapper.prop('style'), { padding: 5 });
    t.true(wrapper.childAt(0).hasClass('panel-heading click-pointer'));

    // Call toggleCallback
    wrapper.childAt(0).simulate('click');
    t.true(spy.called);

    // Spinner
    t.true(wrapper.childAt(0).childAt(0).hasClass('panel-title has-spinner'));
    t.is(wrapper.childAt(0).childAt(0).childAt(0).text(), 'Panel header');

    // leftCustomControls
    t.is(wrapper.childAt(0).childAt(2).childAt(0).text(), 'Left');

    // rightCustomControls
    t.is(wrapper.childAt(0).childAt(3).childAt(0).text(), 'Right');

    // False because we triggered the toggleCallback event earlier
    t.true(wrapper.childAt(0).childAt(4).childAt(0).hasClass('fas fa-chevron-down'));

    t.true(wrapper.childAt(1).hasClass('panel-body hidden'));
    t.is(wrapper.childAt(1).childAt(0).text(), 'TogglePanel content');

    t.true(wrapper.childAt(2).hasClass('panel-footer'));

    // Cancel button
    t.true(wrapper.childAt(2).childAt(0).hasClass('btn btn-trans btn-default'));
    t.is(wrapper.childAt(2).childAt(0).childAt(0).text(), 'Cancel');
    wrapper.childAt(2).childAt(0).simulate('click');
    t.true(cancelSpy.called);

    // Submit button
    t.true(wrapper.childAt(2).childAt(1).hasClass('btn btn-trans btn-warning'));
    t.is(wrapper.childAt(2).childAt(1).childAt(0).text(), 'Submit');
    wrapper.childAt(2).childAt(1).simulate('click');
    t.true(submitSpy.called);
});