### Usage

```typescript
import PdfViewer from '@amalto/pdf-viewer';
```

```javascript
const { IntlProvider } = require('react-intl');
const data = require('./pdf.ts');

<IntlProvider locale="en-US">
  <PdfViewer
    pdfSource={{
      data: atob(data.PDF_DATA),
    }}
    spinnerSrc="images/spinner.gif"
    locale="en-US"
  />
</IntlProvider>;
```
