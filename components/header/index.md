### Usage

```typescript
import Header from '@amalto/header'
```

```javascript
initialState = { selectedEntry: 'Homes', reduceMenu: false };

const selectEntry = ( entry ) => {
    setState( { selectedEntry: entry } )
};

<div style={{ position: 'relative' }}>
    <Header backgroundColor='#fff'
        imgSrc='images/logo.png'
        url='#'
        mainStyle={{ position: 'absolute !important', width: '100%' }}
        clickAction={() => setState({ reduceMenu: !state.reduceMenu })}
        height={70}>
    </Header>

    <Sidebar width={!state.reduceMenu ? undefined : 60} height={300} backgroundColor='#3a3a3a' mainStyle={{marginTop: 0}}>
        <Menu backgroundColor='#3a3a3a'
            mainColor='#89bc55'
            textColor='#b3b8c3'
            subColor='#fff'
            hoverTextColor='#000'
            title='Menu'
            hideLabel={state.reduceMenu}
            selectedEntry={state.selectedEntry}
            selectEntry={selectEntry}
            entries={
                [
                    { label: 'Homes', icon: 'fa-fw fa-fw fas fa-home', url: '#menu' },
                    { label: 'Reports', icon: 'fa-fw fas fa-chart-area', url: '#menu' },
                    { label: 'Frames', icon: 'fa-fw far fa-window-maximize', url: '#menu' },
                    { label: 'Counters', icon: 'fa-fw fas fa-tachometer-alt', url: '#menu' },
                    { label: 'Scripts', icon: 'fa-fw fas fa-terminal', url: '#menu' },
                    { label: 'Homes2', icon: 'fa-fw fa-fw fas fa-home', url: '#menu' },
                    { label: 'Reports2', icon: 'fa-fw fas fa-chart-area', url: '#menu' },
                    { label: 'Frames2', icon: 'fa-fw far fa-window-maximize', url: '#menu' },
                    { label: 'Counters2', icon: 'fa-fw fas fa-tachometer-alt', url: '#menu' },
                    { label: 'Scripts2', icon: 'fa-fw fas fa-terminal', url: '#menu' },
                    { label: 'Homes3', icon: 'fa-fw fa-fw fas fa-home', url: '#menu' },
                    { label: 'Reports3', icon: 'fa-fw fas fa-chart-area', url: '#menu' },
                    { label: 'Frames3', icon: 'fa-fw far fa-window-maximize', url: '#menu' },
                    { label: 'Counters3', icon: 'fa-fw fas fa-tachometer-alt', url: '#menu' },
                    { label: 'Scripts3', icon: 'fa-fw fas fa-terminal', url: '#menu' },
                    { label: 'Homes4', icon: 'fa-fw fa-fw fas fa-home', url: '#menu' },
                    { label: 'Reports4', icon: 'fa-fw fas fa-chart-area', url: '#menu' },
                    { label: 'Frames4', icon: 'fa-fw far fa-window-maximize', url: '#menu' },
                    { label: 'Counters4', icon: 'fa-fw fas fa-tachometer-alt', url: '#menu' },
                    { label: 'Scripts4', icon: 'fa-fw fas fa-terminal', url: '#menu' }
                ]
            }
            >
        </Menu>
    </Sidebar>
</div>
```