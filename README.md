# Platform 6 Components

This project works for [platform 6](https://github.com/amalto/platform6-wiki) and won't to work with others projects.

## Requirements

Platform 6 depends on:

- [Node.js](https://nodejs.org/en/) (version `>= 4`),
- [_b2box_](https://github.com/amalto/platform6-wiki/blob/master/glossary.md#b2box) (version `5.13.8` and higher)

> _b2box_ is the term used to define the previous versions of _Platform 6_.

## Installation

Use the following command in your terminal to install the project:

```terminal
npm install --save @amalto/platform6-ui-components
```

If you want to install a specific component use instead:

```terminal
npm install --save @amalto/{component_name}
```

You must replace `{component_name}` with the wanted component:
```terminal
# example
npm install --save @amalto/spinner
```

## Demo

If you did install the platform4-ui-components project, in order to run the documentation you need to install the project dependencies:

```terminal
npm run boostrap
```

Then run it locally:
```terminal
npm run styleguide
```

You can also build the documentation whch will be stored in the styleguide directory:
```terminal
npm run styleguide:build
```
