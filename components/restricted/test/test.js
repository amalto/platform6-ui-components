import React from 'react';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';

import Restricted from '../build/index.js';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

const scopesTree = {
    'dev': {
        'scripts': {
            'view': {},
            'read': {},
            'edit': {},
            'run': {}
        },
        'home': {
            'reports': {},
            'view': {},
            'customize-own': {},
            'read': {},
            'frames': {},
            'counters': {},
            'configure': {}
        }
    },
    'master': {
        'counters': {
            'read': ['Test'],
            'allow': {
                'allow_1': [{
                    orgFilter: 'UNIT',
                    searchable: 'first',
                    comparisonOperator: '=',
                    value: 'first'
                }],
                'allow_2': [{
                    orgFilter: 'BRANCH',
                    searchable: 'second',
                    comparisonOperator: '>',
                    value: 'second'
                }]
            }
        },
        'home': {
            'reports': {},
            'view': {},
            'read': {}
        }
    }
};

test.beforeEach('Restricted should component exist', t => {
    const wrapper = shallow(<Restricted />);

    t.true(wrapper.exists());
});

test('Restricted should display child', t => {
    const wrapper = shallow(
        <Restricted appInstance='scripts'
            scopesTree={scopesTree}
            authorizedActions={['view']}
            requiredActions={['view']}
            featureId='scripts'
            permissions={['scripts=view', 'scripts=read', 'scripts=edit', 'scripts=run']}
            needsGlobalPermission={false}>
            <div className='padded'>I am visible</div>
        </Restricted>
    );

    t.is(wrapper.children().text(), 'I am visible');
});

test('Restricted shouldn\'t display child', t => {
    const wrapper = shallow(
        <Restricted appInstance='scripts'
            scopesTree={scopesTree}
            authorizedActions={['view']}
            requiredActions={['read']}
            featureId='scripts'
            permissions={['scripts=view', 'scripts=read', 'scripts=edit', 'scripts=run']}
            needsGlobalPermission={false}>
            <div className='padded'>I am visible</div>
        </Restricted>
    );
    t.is(wrapper.children().length, 0);
});