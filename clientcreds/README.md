# Clientcreds
.NET Console App that demonstrates the [client credentials flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow), the [device code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-device-code), and the [on-behalf-of flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).

## Getting Started

### Setup

1. Complete the app registration as detailed in [Common Setup](../../../#common-setup).
2. Copy appsettings.json to appsettings.local.json
3. Change the following values using details from your app registration:

    ```json
    {
        "ClientCredsConfig": {
            "TenantId": "<YOUR_TENANT_ID>",
            "ClientId": "<YOUR_CLIENT_ID>",
            "ClientSecret": "<YOUR_CLIENT_SECRET>"
        }
    }
    ```
4. Set appsettings.local.json to cpoy if newer in settings.

### Running

In the project directory, you can run:

`dotnet run`

Follow the prompts from the command line.
