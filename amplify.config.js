const amplifyConfiguration = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_6c9ILDDVo',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '1r964menkni6ksh8vj8iqdaeve',

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: 'ven.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'phone'],
      redirectSignIn: 'myapp://',
      redirectSignOut: 'myapp://',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
  aws_appsync_graphqlEndpoint:
    'https://rxyhavn6bnci7bebzi672wn43e.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};

export default amplifyConfiguration;
