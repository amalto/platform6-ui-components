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
}

const webStorageMaster = {
    selectedAppInstance: {
        name: 'master'
    },
    scopesTree,
}

const webStorageDev = {
    selectedAppInstance: {
        name: 'dev'
    },
    scopesTree,
}

test('ScopeHelpers: hasPermission', t => {
    t.true(hasPermission(webStorageDev, 'scripts=view'));
    t.true(hasPermission(webStorageMaster, 'counters=read'));
    t.false(hasPermission(webStorageMaster, 'counters=edit'));
    t.false(hasPermission(webStorageMaster, 'home=edit'));
});

test('ScopeHelpers: hasAccessToFeature', t => {
    t.true(hasAccessToFeature(webStorageDev, 'dev', 'scripts'));
    t.true(hasAccessToFeature(webStorageMaster, 'master', 'home'));
    t.false(hasAccessToFeature(webStorageMaster, 'master', 'scripts'));
    t.false(hasAccessToFeature(webStorageMaster, 'master', 'reports'));
});

test('ScopeHelpers: hasAnyPermission', t => {
    t.true(hasAnyPermission(webStorageDev, ['scripts=view', 'home=read']));
    t.true(hasAnyPermission(webStorageMaster, ['scripts=view', 'home=read']));
    t.false(hasAnyPermission(webStorageMaster, ['scripts=view', 'reports=edit']));
    t.false(hasAnyPermission(webStorageDev, ['counters=view', 'reports=read']));
});

test('ScopeHelpers: getScopeValues', t => {
    t.deepEqual(getScopeValues(webStorageMaster, 'master', 'counters', 'read'), ['Test']);
    t.deepEqual(getScopeValues(webStorageDev, 'dev', 'scripts', 'read'), {});
});

test('ScopeHelpers: hasFilterOn', t => {
    t.true(hasFilterOn(webStorageMaster, 'counters', 'allow_1', 'first'));
    t.true(hasFilterOn(webStorageMaster, 'counters', 'allow_2', 'second'));
    t.false(hasFilterOn(webStorageDev, 'counters', 'allow_1', 'second'));
    t.false(hasFilterOn(webStorageDev, 'counters', 'allow_2', 'first'));
});

test('ScopeHelpers: canPerformAnyAction', t => {
    t.true(canPerformAnyAction(['read', 'view'], ['read', 'view']));
    t.true(canPerformAnyAction(['read', 'view'], ['read']));
    t.false(canPerformAnyAction(['read', 'view'], ['edit']));
});