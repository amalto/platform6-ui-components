```javascript
const data = require('./data.json');

<Tree id='tree-exemple' data={{
    "id": "a1",
    "text": "Node A1",
    "children": [
        {
            "id": "b1",
            "text": "Node B1",
            "children": [
                {
                    "id": "c1",
                    "text": "Node C1",
                    "children": null,
                    "icon": "fa fa-fw fa-cube font-color-lighter",
                    "data": {
                        "description": "Node Description (C1)",
                        "parentId": "b1",
                        "childNames": []
                    },
                    "state": {
                        "opened": false,
                        "disabled": false,
                        "selected": false
                    }
                }
            ],
            "icon": "fa fa-fw fa-cube font-color-lighter",
            "data": {
                "description": "Node Description (B1)",
                "parentId": "a1",
                "childNames": []
            },
            "state": {
                "opened": false,
                "disabled": false,
                "selected": false
            }
        },
        {
            "id": "b2",
            "text": "Node B2",
            "children": null,
            "icon": "fa fa-fw fa-cube font-color-lighter",
            "data": {
                "description": "Node Description (B2)",
                "parentId": "a1",
                "childNames": []
            },
            "state": {
                "opened": false,
                "disabled": true,
                "selected": false
            }
        }
    ],
    "icon": "fa fa-fw fa-cube font-color-lighter",
    "data": {
        "description": "Node Description (A1)",
        "parentId": "",
        "childNames": []
    },
    "state": {
        "opened": true,
        "disabled": false,
        "selected": false
    }
}} locale='en-US' />
```