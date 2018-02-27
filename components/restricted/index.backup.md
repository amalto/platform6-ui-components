```javascript
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

<Restricted appInstance='dev'
    scopesTree={scopesTree}
    authorizedActions={['view']}
    requiredActions={['view']}
    featureId='scripts'
    permissions={['scripts=view', 'scripts=read', 'scripts=edit', 'scripts=run']}
    needsGlobalPermission={false}>
    <div className='padded'>I am visible</div>
</Restricted>
```