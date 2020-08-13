
import { UserModel } from './UserModel'
import { AppInstanceModel } from './AppInstanceModel'
import { Endpoints } from './AppEndpointsModel'
import { ScopesTree } from './Scopes'

export interface WebStorage {

    /** logout */
    clearStoredData: () => void;
    /** Set option to remember user */
    storeRememberUser: ( rememberUser: boolean ) => void

    /** Always saved in localStorage (used for app bootstrapping) */
    storeInfraAlertCloseDate: ( date: string ) => void;

    infraAlertCloseDate: string | null;

    /** always saved in localStorage (used for app bootstrapping) */
    storeLastTriggeredUpdate: ( date: string ) => void;

    lastTriggeredUpdate: string | null;

    /**
     * Access and refresh token are either saved in webStorage or in session storage
     * This depends on the choice the user makes at the login page (rememberMe checkbox)
     */
    storeAccessToken: ( accessToken: string ) => void;

    accessToken: string | null;

    storeRefreshToken: ( refreshToken: string ) => void;

    refreshToken: string | null;

    /**
     * All other globals variables are saved in session storage
     * This is to avoid conflicts between multiple browser tabs/windows (like differents selected instance)
     */

    /** saved in sessionStorage */
    storeUser: ( user: UserModel ) => void;

    user: UserModel | null;

    /** Saved in sessionStorage */
    storeAppInstances: ( appInstances: AppInstanceModel[] ) => void;

    appInstances: AppInstanceModel[];

    /** Saved in sessionStorage */
    storeSelectedAppInstance: ( appInstanceName: string ) => void;

    selectedAppInstance: AppInstanceModel | null;

    /** saved in localStorage */
     storeLastUsedAppInstance: ( appInstanceName: string ) => void;

    lastUsedAppInstance: string | null;

    /** saved in sessionStorage */
    storeAppEndpoints: ( appEndpoints: Endpoints ) => void;

    appEndpoints: Endpoints | null;

    /** saved in sessionStorage */
    storeScopesTree: ( scopesTree: ScopesTree ) => void;

    scopesTree: ScopesTree;

    /** saved in sessionStorage */
    storeTempLoginData: ( loginData: Object ) => void;

    clearTempLoginData: () => void;

    tempLoginData: any;

    /** saved in sessionStorage */
    storeSelectedLocaleHeader: ( locale: string ) => void;

    selectedLocaleHeader: any;

    storeLocale: ( locale: string ) => void;

    locale: string;
}
