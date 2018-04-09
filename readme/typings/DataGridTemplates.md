DataGridTemplates uses [DisplayTemplate](#displaytemplate) interface.

```typescript
/**
 * Signature of each "DataGrid" the user has diplayed on each instances and services.
 */
interface DataGridTemplates {

    /** Instance name the template is saved to. */
    [instanceName: string]: {

        /** Service name the template is saved to. */
        [serviceId: string]: {

            /** Unique id of the DataGrid to save. */
            [dataGridId: string]: DisplayTemplate
        }
    }
}
```