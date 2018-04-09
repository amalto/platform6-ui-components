```typescript
module NotificationModel {

    export interface Action {
        
        /** Action name. */
        label: string

        /** Method to launch. */
        callback: () => void
    }
}

interface NotificationModel {

    /** Notification title. */
    title?: string

    /** Content message of the notification. */
    message: string
    
    /** Level of the notification. Available: success, error, warning and info. */
    level: string

    /** Position of the notification. Available: tr (top right), tl (top left), tc (top center), br (bottom right), bl (bottom left), bc (bottom center). */
    position?: string
    
    /** Delay in seconds for the notification go away. Set this to 0 to not auto-dismiss the notification. */
    autoDismiss?: number

    /** If true can't dissmiss notification until autoDismiss time is over. */
    dismissible?: boolean

    /** Action to perform when the notification pop up. */
    action?: NotificationModel.Action
    
    /** Action perfomed when notification is dissmissed. */
    onRemove?: () => void
}
```