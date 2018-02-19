```typescript
/** Object used to store the DataGrid template for each service and for each user. Mode details on [DisplayTemplate](https://localhost:6060/$displaytemplate). */
interface DataGridTemplates {
    [instanceName: string]: {
        [serviceId: string]: {
            [dataGridId: string]: DisplayTemplate
        }
    }
}
```