Map where you can put the content type of your value and a base64 string of your content.

```typescript
interface KeyValDef {
    [key: string]: {
        contentType: string;
        contentBytes: string;
    };
}
```