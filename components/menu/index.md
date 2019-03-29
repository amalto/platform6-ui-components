### Usage

```typescript
import Menu from '@amalto/menu'
```

```javascript
const classNames = require('classnames');

initialState = { selectedEntry: 0, reduceMenu: false };

const selectEntry = ( event, entry ) => {
    event.preventDefault();
    setState( { selectedEntry: entry } );
};

const entries = [

];

<div>
    <span className='btn btn-trans btn-default' onClick={e => setState( { reduceMenu: !state.reduceMenu } )}>
        <i className='fas fa-bars' />
    </span>

    <Sidebar
        width={!state.reduceMenu ? undefined : 60}
        height={200}
        backgroundColor='#3a3a3a' mainStyle={{marginTop: 10}}>
        <Menu mainColor='#89bc55'
            textColor='#b3b8c3'
            subColor='#fff'
            hoverTextColor='#000'
            title='Menu'
            hideLabel={state.reduceMenu}
            selectedEntry={state.selectedEntry}
            selectEntry={selectEntry}
            itemStyle={{}}>
            <a className={classNames( 'menu-link', {
                    'selected': state.selectedEntry === 0,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 0 )}>
                <span className='fa-fw fa-fw fas fa-home' style={{marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Homes'}</span> : null}
            </a>
            <a className={classNames( 'menu-link', {
                'selected': state.selectedEntry === 1,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 1 )} >
                <span className='fa-fw fas fa-chart-area' style={{ marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Reports'}</span> : null}
            </a>
            <a className={classNames( 'menu-link', {
                'selected': state.selectedEntry === 2,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 2 )}>
                <span className='fa-fw far fa-window-maximize' style={{marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Frames'}</span> : null}
            </a>
            <a className={classNames( 'menu-link', {
                'selected': state.selectedEntry === 3,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 3 )}>
                <span className='fa-fw fas fa-tachometer-alt' style={{marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Counters'}</span> : null}
            </a>
            <a className={classNames( 'menu-link', {
                'selected': state.selectedEntry === 4,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 4 )}>
                <span className='fa-fw fas fa-terminal' style={{marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Scripts'}</span> : null}
            </a>
            <a className={classNames( 'menu-link', {
                'selected': state.selectedEntry === 5,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 5 )}>
                <span className='fa-fw fas fa-cogs' style={{marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Administration'}</span> : null}
            </a>
            <a className={classNames( 'menu-link', {
                'selected': state.selectedEntry === 6,
                    'text-center': state.reduceMenu
                } )} href='#menu' onClick={_e => selectEntry( _e, 6 )}>
                <span className='fa-fw fas fa-sitemap' style={{marginRight: !state.reduceMenu ? 5 : 0 }} />
                {!state.reduceMenu ? <span>{'Organizations'}</span> : null}
            </a>
        </Menu>
    </Sidebar>
</div>
```