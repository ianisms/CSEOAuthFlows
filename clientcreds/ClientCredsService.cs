using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace clientcreds
{
    public interface IClientCredsService
    {
        Task GetAccessTokenAsyncCC();
        Task GetAccessTokenAsyncDeviceCode();
        Task GetAccessTokenAsyncOBO(string idToken);
    }

    public class ClientCredsService : IClientCredsService
    {
        private readonly ClientCredsConfig _clientCredsConfig;

        public ClientCredsService(IOptions<ClientCredsConfig> clientCredsConfig)
        {
            _clientCredsConfig = clientCredsConfig.Value ?? throw new ArgumentNullException(nameof(clientCredsConfig));
        }

        public async Task GetAccessTokenAsyncCC()
        {
            var msalApp = ConfidentialClientApplicationBuilder.Create(_clientCredsConfig.ClientId)
                .WithTenantId(_clientCredsConfig.TenantId)
                .WithClientSecret(_clientCredsConfig.ClientSecret)
                .Build();

            var result = await msalApp.AcquireTokenForClient(_clientCredsConfig.Scopes).ExecuteAsync();

            Console.WriteLine($"Access Token ⮧⮧\n{Common.HORIZ_RULE}\n{result.AccessToken}\n{Common.HORIZ_RULE}");
            Console.WriteLine($"Scopes: {JsonSerializer.Serialize(result.Scopes)}\n{Common.HORIZ_RULE}");
        }

        public async Task GetAccessTokenAsyncOBO(string idToken)
        {
            var msalApp = ConfidentialClientApplicationBuilder.Create(_clientCredsConfig.ClientId)
                .WithTenantId(_clientCredsConfig.TenantId)
                .WithClientSecret(_clientCredsConfig.ClientSecret)
                .Build();

            var userAssertion = new UserAssertion(idToken,
                "urn:ietf:params:oauth:grant-type:jwt-bearer");

            var result = await msalApp.AcquireTokenOnBehalfOf(_clientCredsConfig.Scopes, userAssertion).ExecuteAsync();

            Console.WriteLine($"{Common.HORIZ_RULE}\nAccess Token ⮧⮧\n{Common.HORIZ_RULE}\n{result.AccessToken}\n{Common.HORIZ_RULE}");
            Console.WriteLine($"Scopes: {JsonSerializer.Serialize(result.Scopes)}\n{Common.HORIZ_RULE}");
        }

        public async Task GetAccessTokenAsyncDeviceCode()
        {
            var msalApp = PublicClientApplicationBuilder.Create(_clientCredsConfig.ClientId)
                .WithTenantId(_clientCredsConfig.TenantId)
                .Build();

            var result = await msalApp.AcquireTokenWithDeviceCode(_clientCredsConfig.Scopes,
                deviceCodeResult =>
                {
                    Console.WriteLine(deviceCodeResult.Message);
                    return Task.FromResult(0);
                }).ExecuteAsync();

            Console.WriteLine($"Access Token ⮧⮧\n{Common.HORIZ_RULE}\n{result.AccessToken}\n{Common.HORIZ_RULE}");
            Console.WriteLine($"Scopes: {JsonSerializer.Serialize(result.Scopes)}\n{Common.HORIZ_RULE}");

            Console.WriteLine($"View at ⮧⮧\n{Common.HORIZ_RULE}\nhttps://jwt.ms/?#access_token={result.AccessToken}\n{Common.HORIZ_RULE}");
        }
    }
}
