The WebStorage is accesible via service root components.

```typescript
interface WebStorage {

    /** User session's informations. */
    user: UserModel;

    /** Define the language and the region the user is using. e.g: <blockquote>en-US<blockquote>. */
    locale: string;
}
```