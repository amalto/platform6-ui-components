import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Tab from '@amalto/tab';
import Tabs from '../build/index.js';
import {
    shallow,
    configure
} from 'enzyme';

configure({ adapter: new Adapter() });

test.todo('Tabs: getNodeFromInstance: Invalid argument.');

// const tabs = [
//     (<Tab id='tabs-1-example'
//         iconClass='fa fa-file-o'
//         title='First tab'
//         closable={true}>
//         <div>First tab content</div>
//     </Tab>),
//     (<Tab id='tabs-2-example'
//         iconClass='fa fa-file-o'
//         title='Second tab'
//         closable={false}>
//         <div>Second tab content</div>
//     </Tab>)
// ];

// test.beforeEach('Tabs component should exist', t => {
//     const closeTab = (tabId) => {
//         // Handle close tab here
//     };
//     const openedTab = (tabId) => {
//         // Handle tab selection
//     };
//     const wrapper = shallow(
//         <Tabs closeTab={closeTab}
//             openedTab={openedTab}
//             tabs={tabs}
//             selectedTabId={'tabs-1-example'}
//         />
//     );

//     t.true(wrapper.exists());
// });

// test('Tabs props should be defined', t => {
//     const closeTab = (tabId) => {
//         // Handle close tab here
//     };
//     const openedTab = (tabId) => {
//         // Handle tab selection
//     };
//     const wrapper = shallow(
//         <Tabs closeTab={closeTab}
//             openedTab={openedTab}
//             allowHorizontalScrolling={false}
//             tabs={tabs}
//             selectedTabId={state.selectedTabId}
//             editedTabIds={['tabs-2-example']}
//             tabWrapperStyle={{}}
//             tabLinkStyle={{}}
//         />
//     );
//     t.pass();
// });