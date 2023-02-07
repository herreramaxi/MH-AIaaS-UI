export const environment = {
  production: false,
  auth0: {
    domain: 'domain',
    clientId: 'clientId',
    authorizationParams: {
      audience: 'audience',
      redirect_uri: 'redirect_uri',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:6060',
  },
};
