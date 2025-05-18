const domain = () => {
  return 'http://192.168.110.242:8080';
};

export const environment = {
  production: false,
  // AUTHENTICATION_BASE_URL: 'http://localhost:8080/api/authentication',
  // AUTHENTICATED_BASE_URL: 'http://localhost:8080/api/authenticated',

  AUTHENTICATION_BASE_URL: `${domain()}/api/authentication`,
  AUTHENTICATED_BASE_URL: `${domain()}/api/authenticated`,
  REDIRECT_BASE_URL: `${domain()}`,
};
