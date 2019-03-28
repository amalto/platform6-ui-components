### Classes

Those classes are not provided in the components, we are using our own css, you will have to customize your menu by adding your own classes. This is what the class looks like.

```scss
// Disable default link color
a {
    &link, &:visited {
        color: rgb(179, 184, 195);
    }
}

.menu-link {
    color: rgb(179, 184, 195);
    display: block;
    padding: 9px 10px;

    &:hover {
        color: #1d2939;
        background-color: #ffffff;
    }

    &:active {
        color: #ffffff;
        background-color: #89BC55;
    }
}

.menu-line {
    margin-top: 2;
    list-style: none;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 4px;
}
```