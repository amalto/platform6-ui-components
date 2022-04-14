
import { UserModel } from './UserModel'
import { AppInstanceModel } from './AppInstanceModel'
import { Endpoints } from './AppEndpointsModel'
import { ScopesTree } from './Scopes'
import { SSOConnection } from './SSO';

export interface WebStorage {

  accessToken: string | null;
  appEndpoints: Endpoints | null;
  appInstances: AppInstanceModel[];
  clearSSOConnection: () => void;
  clearSignupAccessTokens: () => void;
  clearStoredData: () => void;
  clearTempLoginData: () => void;
  importStorage: (data: { session: Map<string, string>, local: Map<string, string> }) => void;
  infraAlertCloseDate: string | null;
  injectedUIData: Object;
  lastTriggeredUpdate: string | null;
  lastUsedAppInstance: string | null;
  locale: string;
  portalMode: string;
  portalVersion: string | null;
  refreshToken: string | null;
  scopesTree: ScopesTree;
  selectedAppInstance: AppInstanceModel | null;
  selectedLocaleHeader: any;
  signupAccessTokens: Object;
  SSOConnection: SSOConnection | null;
  storeAccessToken: (accessToken: string) => void;
  /** saved in sessionStorage */
  storeAppEndpoints: (appEndpoints: Endpoints) => void;
  /** Saved in sessionStorage */
  storeAppInstances: (appInstances: AppInstanceModel[]) => void;
  /** Always saved in localStorage (used for app bootstrapping) */
  storeInfraAlertCloseDate: (date: string) => void;
  storeInjectedUIData: (data: any) => void;
  /** always saved in localStorage (used for app bootstrapping) */
  storeLastTriggeredUpdate: (date: string) => void;
  /** saved in localStorage */
  storeLastUsedAppInstance: (appInstanceName: string) => void;
  storeLocale: (locale: string) => void;
  setPortalMode: (mode: string) => void;
  setPortalVersion: (version: string) => void;
  storeRefreshToken: (refreshToken: string) => void;
  storeRememberUser: (rememberUser: boolean) => void;
  /** saved in sessionStorage */
  storeScopesTree: (scopesTree: ScopesTree) => void;
  /** Saved in sessionStorage */
  storeSelectedAppInstance: (appInstanceName: string) => void;
  storeSelectedLocaleHeader: (locale: string) => void;
  storeSignupAccessTokens: (data: { accessToken: string, refreshToken: string, loggedIn: boolean }) => void;
  storeSSOConnection: (SSOConnection: SSOConnection) => void;
  /** saved in sessionStorage */
  storeTempLoginData: (loginData: Object) => void;
  /** saved in sessionStorage */
  storeUser: (user: UserModel) => void;
  tempLoginData: any;
  user: UserModel | null;
}
