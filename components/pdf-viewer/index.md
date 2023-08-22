### Usage

```typescript
import PdfViewer from '@amalto/pdf-viewer';
```

```javascript
const data = require('./pdf.ts');

<div>
  <PdfViewer data={data.PDF_DATA} name="pdf-viewer-base64" width="100%" />
  <PdfViewer
    url="https://www.africau.edu/images/default/sample.pdf"
    name="pdf-viewer-base64"
    width="100%"
    height={1145}
  />
</div>;
```
