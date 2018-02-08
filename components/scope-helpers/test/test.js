import React from 'react';
import * as sinon from 'sinon';
import test from 'ava';

import {
    hasPermission,
    hasAccessToFeature,
    hasAnyPermission,
    hasFilterOn,
    getScopeValues,
    canPerformAnyAction
} from '../build/index.js';

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

test('ScopeHelpers: hasPermission', t => {
    t.true(hasPermission('dev', scopesTree, 'scripts=view'));
    t.true(hasPermission('master', scopesTree, 'counters=read'));
    t.false(hasPermission('master', scopesTree, 'counters=edit'));
    t.false(hasPermission('master', scopesTree, 'home=edit'));
});

test('ScopeHelpers: hasAccessToFeature', t => {
    t.true(hasAccessToFeature('dev', scopesTree, 'scripts'));
    t.true(hasAccessToFeature('master', scopesTree, 'home'));
    t.false(hasAccessToFeature('master', scopesTree, 'scripts'));
    t.false(hasAccessToFeature('master', scopesTree, 'reports'));
});

test('ScopeHelpers: hasAnyPermission', t => {
    t.true(hasAnyPermission('dev', scopesTree, ['scripts=view', 'home=read']));
    t.true(hasAnyPermission('master', scopesTree, ['scripts=view', 'home=read']));
    t.false(hasAnyPermission('master', scopesTree, ['scripts=view', 'reports=edit']));
    t.false(hasAnyPermission('dev', scopesTree, ['counters=view', 'reports=read']));
});

test('ScopeHelpers: getScopeValues', t => {
    t.deepEqual(getScopeValues('master', scopesTree, 'counters', 'read'), ['Test']);
    t.deepEqual(getScopeValues('dev', scopesTree, 'scripts', 'read'), {});
});

test('ScopeHelpers: hasFilterOn', t => {
    t.true(hasFilterOn('master', scopesTree, 'counters', 'allow_1', 'first'));
    t.true(hasFilterOn('master', scopesTree, 'counters', 'allow_2', 'second'));
    t.false(hasFilterOn('dev', scopesTree, 'counters', 'allow_1', 'second'));
    t.false(hasFilterOn('dev', scopesTree, 'counters', 'allow_2', 'first'));
});

test('ScopeHelpers: canPerformAnyAction', t => {
    t.true(canPerformAnyAction(['read', 'view'], ['read', 'view']));
    t.true(canPerformAnyAction(['read', 'view'], ['read']));
    t.false(canPerformAnyAction(['read', 'view'], ['edit']));
});