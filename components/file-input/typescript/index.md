FileInput allow you to upload several files in one time by drag and dropping them into the box.
You can also click on the box to add a file.

In this exemple most of the props are randomly set in order to show most of the component functionality.

```javascript
initialState = { filesQueue: {} };

function addFilesToQueue( files ) {
    const filesQueue = state.filesQueue;

    files.forEach( file => {
        const progress = Math.round( Math.random() * 100 )

        filesQueue[file.name] = {
            sourceFile: file,
            message: 'MESSAGE',
            createdMessagesIds: file.name,
            uploadStarted: true,
            uploadProgress: progress,
            uploadEnded: progress >= 50,
            processSuccess: progress >= 75,
            processState: progress >= 75
                ? '' : progress >= 50
                ? 'WARNING' : 'ERROR'
        }
    } );
    setState({ filesQueue });
}

function deleteUploadedFile( filename ) {
    const filesQueue = state.filesQueue;

    delete filesQueue[filename];
    setState({ filesQueue });
}

function cancelSubmit() {
    setState({ filesQueue: {} });
}

<FileInput filesQueue={state.filesQueue}
    addFilesToQueue={addFilesToQueue}
    deleteUploadedFile={deleteUploadedFile}
    cancelSubmit={cancelSubmit}
    locale='en-US'
/>
```