/**
 * Created by franckmontaigne on 03/06/16.
 */

interface PortalConfig {
    [clientId: string]: {
        registrationComponent?: string;
        testBaseUrl?: string;
        prodBaseUrl?: string;
        prodEnabled?: boolean;
    };
}

export default PortalConfig