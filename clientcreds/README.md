# Getting Started

## Setup

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

## Running

In the project directory, you can run:

`dotnet run`

Follow the prompts from the command line.