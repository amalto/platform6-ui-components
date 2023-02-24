const initialState = {
  component: {
    script: '',
    sourceData: [],
  },
  requestId: '',
  serviceId: 'documentation',
  fetchingStatus: {
    component: false,
  },
  serviceContext: {},
};

export function servicesReducer(state = initialState /** action */) {
  return state;
}
