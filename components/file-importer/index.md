Click on the button to display the file importer modal.

The icons used are [FontAwesome](https://fontawesome.com/icons?d=gallery) classes.

```javascript
initialState = { open: false, fileData: {name: 'test_file', size: 100} };

<div>

    <ActionButton iconClass='fas fa-upload'
        btnClass='btn btn-trans btn-info'
        clickAction={() => { setState( {open: !state.open} )}}
        tooltipText='Display the modal'
    />

    {
        state.open ? <FileImporter fileData={state.fileData}
            cancelHandler={() => { setState( {open: false} ) }}
            submitHandler={() => { setState( {open: false} ) }}
            hideControls={{
                fileType: false,
                separator: false,
                quoteChar: false,
                encoding: false,
                headers: false,
                overwrite: false
            }}
            locale='en-US'
        /> : null
    }
</div>
```