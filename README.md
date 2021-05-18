# CSEOAuthFlows

Demo app repo to demonstrate the different OAuth 2.0 flows as implemented by the [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols).

## Common Setup

1. Create an app registration 
  1. Sign in to the Azure portal.
  2. If you have access to multiple tenants, use the Directory + subscription filter  in the top menu to select the tenant in which you want to register an application.
  3. Search for and select Azure Active Directory.
  4. Under Manage, select App registrations > New registration.
  5. When the Register an application page appears, enter your application's registration information:
     1. Enter a Name for your application, for example AspNetCore-WebApp. Users of your app might see this name, and you can change it later.
     2. Choose the supported account types for your application. (See Supported account types.)
     3. For Redirect URI, enter http://localhost:3000/?implicit.
     4. Select Register.
  6. Click on Authentication and then add the following information:
     1. In the Web section, add https://jwt.ms as a Redirect URI.
     2. Click Add a platform.
        1. Click on Single-page application.
        2. For Redirect Uris enter http://localhost:3000
        3. Click Configure.
     3. In the Single-page application section, add http://localhost:3000/?msal as a Redirect URI.
     4. Under Implicit grant and hybrid flows, select Access Tokens and ID tokens.
     5. Click Save.
  7. Click on Certificates & secrets.
  8. Click on New client secret.
     1. Enter Default for description.
     2. Click Add.

## Apps

- [demotastic](demotastic) - React JS App that demonstrates OIDC, the implicit flow, and the auth code.
- [clientcreds](clientcreds) - .NET Console App that demonstrates the client credentials flow, device code flow, and the on-behalf-of flow.
