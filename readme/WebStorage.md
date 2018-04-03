WebStorage is accesible via service root components.

WebStorage uses [UserModel](#usermodel) interface.

Available <blockquote>locale</blockquote> are listed [here](#locale).

```typescript
interface WebStorage {

    /** User session's informations. */
    user: UserModel;

    /** Define the language and the region the user is using. e.g: "en-US". */
    locale: string;
}
```