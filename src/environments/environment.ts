// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appHost: 'https://shopexpress.ng',
  endPoint: 'https://lenoscloud.com',
  tokenBaseEndpoint: "https://lenoscloud.com/oauth/token",
  storageURL: 'https://lenos.s3.amazonaws.com/pictures/',
  googleClientId: "",
  facebookAppId: "",
  clientId: "web-client",
  clientSecret: "password",
  grantType: "password",
  allowedRoutes: [
    '/business/login',
    '/business/signup',
    '/business/verify-account'
  ],
  pageSize: 12,
  appURL: '',
};

