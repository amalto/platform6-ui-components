const initialState = {
    staticDirectory: '',
    accessToken: '',
    justLoggedIn: false,
    appInstances: [],
    selectedAppInstanceName: 'documentation',
    appKeys: [],
    blockingAppInstanceItems: [],
    user: {},
    isFetchingAppsData: false,
    isFetchingAppKeys: false,
    hasSetPassword: false,
    errorSettingPassword: false,
    hasRequestedPassword: false,
    clientAccessToken: '',
    isFetchingAuthCode: false,
    loginSuccess: true,
    registrationEmail: '',
    registrationMode: '',
    registrationState: {},
    portalConfig: {},
    profilePageStatus: {
        updatingAvatar: false,
        updatingDetails: false,
        updatingSettings: false,
        updatingPassword: false
    },
    jobControlPanelOpen: false,
    runningJobs: [],
    openedJob: {},

    loadingTimer: 0
};

export function mainReducer( state = initialState, /** action */ ) {
    return state
}