import { AppInstanceModel } from './AppInstanceModel'
import { AppKey } from './AppKey'
import { UserModel } from './UserModel'
import { RegistrationState } from './Registration'
import PortalConfig from './PortalConfig'
import { RunningJob } from './JobControl'

interface MainState {

    staticDirectory: string;
    //shared properties across app
    accessToken: string;
    justLoggedIn: boolean;

    appInstances: AppInstanceModel[];
    selectedAppInstanceName: string;
    appKeys: AppKey[];

    blockingAppInstanceItems: string[];

    user: UserModel;

    isFetchingAppsData: boolean;
    isFetchingAppKeys: boolean;

    hasSetPassword: boolean;
    errorSettingPassword: boolean;
    hasRequestedPassword: boolean;
    clientAccessToken: string;

    isFetchingAuthCode: boolean;
    loginSuccess: boolean;

    registrationEmail: string;
    //'TEST' | 'PROD' | 'TEST_AND_PROD'
    registrationMode: string;
    registrationState: RegistrationState;

    portalConfig: PortalConfig;

    profilePageStatus: {
        updatingAvatar: boolean;
        updatingDetails: boolean;
        updatingSettings: boolean;
        updatingPassword: boolean;
    }

    jobControlPanelOpen: boolean;
    runningJobs: RunningJob[];
    openedJob: RunningJob;

    loadingTimer: number;
}


export default MainState