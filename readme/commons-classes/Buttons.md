All the classes used to define a button will be define below.

```jsx noeditor
<div className='button-example'>
    <div className='note'>
        <div>Each button must have the <strong>.btn</strong> class, otherwise the class wont work.</div>
        <div>You shouldn't use the color classes define above to handle buttons colors, it will break the others buttons classes.</div>
    </div>

    <h4>Buttons types</h4>
    <div className='btn-toolbar'>
        <button className='btn disabled'>.disabled</button>
        <button className='btn btn-default'>.btn-default</button>
        <button className='btn btn-font'>.btn-font</button>
        <button className='btn btn-success'>.btn-success</button>
        <button className='btn btn-primary'>.btn-primary</button>
        <button className='btn btn-info'>.btn-info</button>
        <button className='btn btn-warning'>.btn-warning</button>
        <button className='btn btn-danger'>.btn-danger</button>
    </div>

    <h4>Transparent buttons</h4>
    <div className='btn-toolbar'>
        <button className='btn btn-trans btn-default'>.btn-default</button>
        <button className='btn btn-trans btn-font'>.btn-font</button>
        <button className='btn btn-trans btn-success'>.btn-success</button>
        <button className='btn btn-trans btn-primary'>.btn-primary</button>
        <button className='btn btn-trans btn-info'>.btn-info</button>
        <button className='btn btn-trans btn-warning'>.btn-warning</button>
        <button className='btn btn-trans btn-danger'>.btn-danger</button>
    </div>

    <h4>Buttons sizes</h4>
    <div className='btn-toolbar'>
        <button className='btn btn-trans btn-info btn-xs'>.btn-xs</button>
        <button className='btn btn-trans btn-info btn-sm'>.btn-sm</button>
        <button className='btn btn-trans btn-info btn-lg'>.btn-lg</button>
    </div>
</div>
```