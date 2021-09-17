/**
 * Created by franckmontaigne on 20/07/15.
 */


module NotificationModel {
    export interface Action {
        label: string
        callback: () => void
    }

    export enum Type {
        APP_LOADED,
        SUCCESS_CREATE,
        SUCCESS_UPDATE,
        SUCCESS_DELETE,
        INVALID_PASSWORD,
        INVALID_EMAIL,
        CARD_TEMPLATE_ITEM_FULL,
        INVALID_COLOR_CODE,
        EMPTY_VALUE,
        XHR_ERROR,
        PASSWORD_UPDATED,
        DETAILS_UPDATED,
        SETTINGS_UPDATED,
        AVATAR_UPDATED,
        USER_ASSOCIATED,
        USER_ASSOCIATE_RESEND,
        USER_DISASSOCIATED,
        MESSAGE_DELETED,
        MESSAGE_REPROCESSED,
        USER_EXISTS,
        UNEXPECTED_ERROR,
        REGISTRATION_UNAVAILABLE
    }

    export interface Details {
        notificationType?: Type
        displayParameter?: any
        notificationOptions?: NotificationModel
    }
}

interface NotificationModel {
    title?: string
    message: string
    //Level of the notification. Available: success, error, warning and info
    level: string
    //Position of the notification. Available: tr (top right), tl (top left), tc (top center), br (bottom right), bl (bottom left), bc (bottom center)
    position?: string
    //Delay in seconds for the notification go away. Set this to 0 to not auto-dismiss the notification
    autoDismiss?: number
    dismissible?: boolean
    action?: NotificationModel.Action
    onRemove?: () => void
}

export { NotificationModel }