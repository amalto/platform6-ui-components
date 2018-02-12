/**
 * Created by franckmontaigne on 16/03/16.
 */


module ServicesState {

    export function getInitialState(): ServicesState {

        return {

            component: null,
            requestId: '',
            serviceId: '',

            fetchingStatus: {
                component: false
            },

            serviceContext: {}

        } as ServicesState
    }


}

interface ServicesState {

    component: {
        script: string;
        sourceData: any;
    }

    requestId: string;

    serviceId: string;

    fetchingStatus: {
        component: boolean;
    }

    serviceContext: {
        [appInstance: string]: {
            [serviceId: string]: any
        }
    }

}

export default ServicesState
