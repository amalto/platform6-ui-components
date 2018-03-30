DataGridTemplates uses [DisplayTemplate](#displaytemplate) interface.

```typescript
/**
 * Object used to store the DataGrid template for each service and for each user.
 */
interface DataGridTemplates {
    [instanceName: string]: {
        [serviceId: string]: {
            [dataGridId: string]: DisplayTemplate
        }
    }
}
```