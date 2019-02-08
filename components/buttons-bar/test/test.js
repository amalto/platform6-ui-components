import * as React from 'react';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import ButtonsBar from '../build/index.js';

configure({ adapter: new Adapter() });


test.beforeEach('ButtonsBar component should exist', t => {
    const wrapper = shallow(<ButtonsBar btnGroups={[]} />);

    t.true(wrapper.exists());
});

test('Check ButtonsBar props', t => {
    const spyButton = sinon.spy(() => { console.info('trigger button on click') });
    const spyBtnContent = sinon.spy(() => { console.info('trigger btnContent on click') });
    const spyHandleSearch = sinon.spy(searchValue => { console.info('handleSearch of ButtonsBar triggered'); });

    const wrapper = shallow(
        <ButtonsBar btnGroups={[
            {
                btns: [
                    {
                        clickAction: spyButton,
                        cssClass: 'button',
                        iconClass: 'icon',
                        text: 'button text',
                        disabled: false,
                        tooltipText: 'button tooltip',
                        btnContent: null,
                        content: null,
                        type: 'button'
                    },
                    {
                        clickAction: spyBtnContent,
                        cssClass: 'btnContent',
                        disabled: true,
                        tooltipText: 'btnContent tooltip',
                        btnContent: 'btnContent text',
                    }
                ],
                style: { height: 70 },
                cssClass: 'buttons-bar'
            }
        ]}
            handleSearch={spyHandleSearch}
            searchValue={'test'}
            locale={'en-US'}
        />
    );

    console.info(wrapper.childAt(1).childAt(1).props());

    // Buttons group
    t.true(wrapper.hasClass('btn-toolbar'));
    t.true(wrapper.childAt(0).hasClass('btn-group'));
    t.true(wrapper.childAt(0).hasClass('btn-group-sm'));
    t.true(wrapper.childAt(0).hasClass('buttons-bar'));
    t.is(wrapper.childAt(0).prop('style').height, 70);

    // Buttons
    t.true(wrapper.childAt(0).childAt(0).hasClass('btn'));
    t.true(wrapper.childAt(0).childAt(0).hasClass('button'));
    t.not(wrapper.childAt(0).childAt(0).prop('disabled'));
    t.is(wrapper.childAt(0).childAt(0).prop('data-original-title'), 'button tooltip');
    t.is(wrapper.childAt(0).childAt(0).prop('type'), 'button');
    t.is(wrapper.childAt(0).childAt(0).prop('data-toggle'), 'tooltip');

    t.true(wrapper.childAt(0).childAt(1).hasClass('btn'));
    t.true(wrapper.childAt(0).childAt(1).hasClass('btnContent'));
    t.true(wrapper.childAt(0).childAt(1).hasClass('disabled'));
    t.is(wrapper.childAt(0).childAt(1).prop('data-original-title'), 'btnContent tooltip');
    t.is(wrapper.childAt(0).childAt(1).prop('data-toggle'), 'tooltip');

    wrapper.childAt(0).childAt(0).simulate('click');
    t.true(spyButton.called);

    wrapper.childAt(0).childAt(1).simulate('click');
    t.true(spyBtnContent.called);

    wrapper.childAt(1).childAt(0).simulate('submit', {
        preventDefault: () => { console.info('preventDefault') }
    });
    t.true(spyHandleSearch.called);

    // Icon
    t.true(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).hasClass('fa-fw'));
    t.true(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).hasClass('right-spaced'));
    t.true(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).hasClass('icon'));

    // Text
    t.is(wrapper.childAt(0).childAt(0).childAt(0).childAt(1).text(), 'button text');
    t.is(wrapper.childAt(0).childAt(1).text(), 'btnContent text');

    // Search
    t.true(wrapper.childAt(1).hasClass('btn-group'));
    t.true(wrapper.childAt(1).hasClass('btn-group-sm'));
    t.true(wrapper.childAt(1).hasClass('icon-input'));
    t.true(wrapper.childAt(1).hasClass('pull-right'));

    // Input
    t.is(wrapper.childAt(1).childAt(0).childAt(0).prop('type'), 'text');
    t.is(wrapper.childAt(1).childAt(0).childAt(0).prop('value'), 'test');
    t.true(wrapper.childAt(1).childAt(0).childAt(0).hasClass('form-control'));

    t.true(wrapper.childAt(1).childAt(1).hasClass('icon-ctn'));
    t.true(wrapper.childAt(1).childAt(1).childAt(0).hasClass('fa'));
    t.true(wrapper.childAt(1).childAt(1).childAt(0).hasClass('fa-fw'));
    t.true(wrapper.childAt(1).childAt(1).childAt(0).hasClass('fa-search'));
    t.true(wrapper.childAt(1).childAt(1).childAt(0).hasClass('text-medium'));
    t.true(wrapper.childAt(1).childAt(1).childAt(0).hasClass('default-color'));

    t.true(wrapper.childAt(1).childAt(1).childAt(1).hasClass('v-align-hook'));
});