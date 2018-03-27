The icons used are [FontAwesome](https://fontawesome.com/icons?d=gallery) classes.

```javascript
const ActionButton = require('@amalto/action-button').default;

initialState = { opened: true, showSpinner: false };

const toggleCallback = ( opened ) => {
    setState({ opened});
};

<TogglePanel panelTitle='Panel header'
    defaultOpened={true}
    hideTitle={false}
    togglable={true}
    showSpinner={state.showSpinner}
    leftCustomControls={null}
    rightCustomControls={null}
    cancelBtn={{
        label: 'Cancel',
        action: () => window.alert('Cancel button'),
        cssClass: 'btn btn-trans btn-default'
    }}
    submitBtn={{
        label: 'Submit',
        action: () => window.alert('Submit button'),
        cssClass: 'btn btn-trans btn-warning'
    }}
    customStyle={{}}
>
    <div>
        <ActionButton clickAction={() => setState({ showSpinner: !state.showSpinner })}
            iconClass='fas fa-eye'
            tooltipText='Display or hide spinner'
            btnClass='btn btn-info'
        />
    </div>
</TogglePanel>
```