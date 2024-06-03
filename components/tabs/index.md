### Usage

```typescript
import Tabs from '@amalto/tabs';
```

```javascript
const Tab = require('@amalto/tab').default;

initialState = {
  selectedTabId: 'tabs-1-example',
  tabs: [
    <Tab id="tabs-1-example" iconClass="far fa-file" title="First tab" closable={true}>
      <div>First tab content</div>
    </Tab>,
    <Tab id="tabs-2-example" iconClass="fas fa-cube" title="Second tab" closable={false}>
      <div>Second tab content</div>
    </Tab>,
  ],
};

const closeTab = (tabId) => {
  setState({ tabs: [state.tabs[1]] });
};
const openedTab = (tabId) => {
  setState({ selectedTabId: tabId });
};

<Tabs
  closeTab={closeTab}
  openedTab={openedTab}
  allowHorizontalScrolling={false}
  tabs={state.tabs}
  selectedTabId={state.selectedTabId}
  editedTabIds={['tabs-2-example']}
  tabWrapperStyle={{}}
  tabLinkStyle={{}}
/>;
```
