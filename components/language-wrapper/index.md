### Usage

```typescript
import LanguageWrapper from '@amalto/language-wrapper';
```

```javascript
const { addValToArrayNoDup, removeValFromArrayNoDup } = require('@amalto/helpers');

initialState = { selectedLanguage: 'EN', supportedLanguages: ['EN'] };

const handleLanguageChange = (language) => setState({ selectedLanguage: language });
const handleAddedLanguage = (language) => {
  setState({
    supportedLanguages: addValToArrayNoDup(state.supportedLanguages, language),
    selectedLanguage: state.selectedLanguage !== language || 'EN',
  });
};
const handleRemovedLanguage = (language) => {
  setState({
    supportedLanguages: removeValFromArrayNoDup(state.supportedLanguages, language),
    selectedLanguage: state.selectedLanguage !== language || 'EN',
  });
};

<LanguageWrapper
  selectedLanguage={state.selectedLanguage}
  supportedLanguages={state.supportedLanguages}
  handleLanguageChange={handleLanguageChange}
  handleAddedLanguage={handleAddedLanguage}
  handleRemovedLanguage={handleRemovedLanguage}
  containerClass="col-lg-12 col-xs-12 padding-none"
  locale="en-US"
/>;
```
