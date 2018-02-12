# Platform 6 UI Components

> :construction: This project is currently in development. :construction:

## Installation

Use the following command in your terminal to install the project:

```terminal
git clone https://github.com/amalto/platform6-ui-components.git
```

If you want to install a specific component use instead:

### With npm

You need to install [Node.Js](https://nodejs.org/en/).

```terminal
npm install --save @amalto/{component_name}
```

You must replace `{component_name}` with the wanted component:
```terminal
# example
npm install --save @amalto/spinner
```

## Documentation

In order to install the documentation you need [Node.Js](https://nodejs.org/en/).

To read the documentation you need to install the project dependencies:

```terminal
npm run bootstrap
```

Then run it locally:
```terminal
npm run styleguide
```

You can also build the documentation which will be stored in the styleguide directory:
```terminal
npm run styleguide:build
```

You will be able to see the documentation at the url `http://localhost:6060`

## License

MIT © 2018 [Amalto Technologies](https://www.amalto.com/)
