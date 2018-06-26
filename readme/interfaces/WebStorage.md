WebStorage is accesible via service root components.

WebStorage uses [UserModel](#usermodel) interface.

Available <span className='quote'>locale</span> are listed [here](#locale).

```typescript
interface WebStorage {

    /** User session's informations. */
    user: UserModel;

    /** Define the language and the region the user is using. e.g: "en-US". */
    locale: string;
}
```