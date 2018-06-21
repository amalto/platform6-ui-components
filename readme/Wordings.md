```jsx noeditor
const version = require('../components/wordings/package.json').version;
const Pathline = require('../typescript/custom/Pathline').default;

<Pathline children={JSON.stringify( { name: '@amalto/wordings', version } )} />
```

Multi language text used in the UI.

### Usage

```typescript
import * as wordings from '@amalto/wordings'
```

```typescript

/** Multilanguage wordings. */
export interface Wordings {

    /** Wording key. */
    [key: string]: {

        /** Wording locale. */
        [lang: string]: string;
    }
}

/** Wordings after being compiled with the language selected. */
export interface CompiledWordings {

    /** Wording key. */
    [key: string]: string;
}
```

```jsx noeditor
const WordingsList = require('../typescript/custom/WordingsList').default;
const wordings = require('../components/wordings/index.tsx').MULTILANGUAGE_WORDINGS;

<WordingsList wordings={wordings} />
```