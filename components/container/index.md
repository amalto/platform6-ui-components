### Usage

```typescript
import Container from '@amalto/container'
```

```javascript
initialState = { selectedEntry: 'Homes', reduceMenu: false, sidebarSize: 300  };

const selectEntry = ( entry ) => {
    setState( { selectedEntry: entry } )
};

// In this example the `header` position is set to `absolute` instead of `fixed` because it should stay in the example container.

<section style={{ position: 'relative' }}>
    <HeaderBar backgroundColor='#fff'
        imgSrc='images/logo.png'
        url='#'
        mainStyle={{ position: 'absolute !important', width: '100%' }}
        burgerAction={() => setState({ reduceMenu: !state.reduceMenu, sidebarSize: !state.reduceMenu ? 60 : 300 })}
        height={70}>
    </HeaderBar>

    <Sidebar width={state.sidebarSize} height={200} backgroundColor='#3a3a3a' mainStyle={{margin: 0, display: 'inline-block' }}>
        <Menu mainColor='#89bc55'
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
                    { label: 'Administration', icon: 'fa-fw fas fa-cogs', url: '#menu' },
                    { label: 'Organizations', icon: 'fa-fw fas fa-sitemap', url: '#menu' }
                ]
            }
            >
        </Menu>
    </Sidebar>
    <Container mainStyle={{
        backgroundColor: '#f0f3f3',
        position: 'absolute',
        display: 'inline-block',
        padding: 10,
        height: 'calc( 100% - 75px)',
        width: `calc( 100% - ${state.sidebarSize}px)`}}>
        <TogglePanel panelTitle='Container' defaultOpened={true} togglable={false} customStyle={{height: '100%'}}>
        </TogglePanel>
    </Container>
</section>
```