// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add 'isEdge' to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;

let accountId = '';

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest = {
    scopes: ['User.Read']
};

// Add here scopes for access token to be used at MS Graph API endpoints.
const tokenRequest = {
    scopes: ['User.Read'],
    forceRefresh: false // Set this to 'true' to skip a cached token and go to the server to get a new token
};

const silentRequest = {
    scopes: ['openid', 'User.Read']
};

const logoutRequest = {}

// Config object to be passed to Msal on creation
const msalConfig = {
    auth: {
        clientId: '3e2cfd00-1c37-4fd5-bc9b-d476ecd439e2',
        authority: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47',
        redirectUri: 'http://localhost:30662'
    },
    cache: {
        cacheLocation: 'localStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

// Create the main msalapp instance
// configuration parameters are located at authConfig.js
const msalapp = new msal.PublicClientApplication(msalConfig);

window.onload = (event) => {
    // Redirect: once login is successful and redirects with tokens, call Graph API
    msalapp.handleRedirectPromise().then(handleResponse).catch(err => {
        console.error(err);
    });
}

const handleResponse = (resp) => {
    if (resp !== null) {
        accountId = resp.account.homeAccountId;
        showWelcomeMessage(resp.account);
    } else {
        // need to call getAccount here?
        const currentAccounts = msalapp.getAllAccounts();
        if (!currentAccounts || currentAccounts.length < 1) {
            return;
        } else if (currentAccounts.length > 1) {
            // Add choose account code here
        } else if (currentAccounts.length === 1) {
            accountId = currentAccounts[0].homeAccountId;
            showWelcomeMessage(currentAccounts[0]);
        }
    }
};

const login = () => {
    return msalapp.loginRedirect(loginRequest);
};

const logout = () => {
    const logoutRequest = {
        account: msalapp.getAccountByHomeId(accountId)
    };

    msalapp.logout(logoutRequest);
};

const getTokenRedirect = async (request, account) => {
    request.account = account;
    return await msalapp.acquireTokenSilent(request).catch(async (error) => {
        console.log('silent token acquisition fails.');
        if (error instanceof msal.InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            console.log('acquiring token using redirect');
            msalapp.acquireTokenRedirect(request);
        } else {
            console.error(error);
        }
    });
}