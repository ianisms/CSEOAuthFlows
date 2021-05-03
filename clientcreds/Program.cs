using clientcreds.Loggers;
using ClientCreds.Models;
using ClientCreds.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace ClientCreds
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.local.json", optional: false, reloadOnChange: true)
                .Build();

            var serviceProvider = new ServiceCollection()
                .AddLogging(c => c.AddConsoleLogger())
                .Configure<ClientCredsConfig>(c => config.GetSection(c.GetType().Name).Bind(c))
                .AddSingleton<IClientCredsService, ClientCredsService>()
                .BuildServiceProvider();

            await ShowMenuAsync(serviceProvider);
        }

        static async Task ShowMenuAsync(IServiceProvider serviceProvider)
        {
            _ = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));

            var clientCredsService = serviceProvider.GetRequiredService<IClientCredsService>();

            Console.Clear();
            Console.WriteLine("Press Choose a Scenario:");
            Console.WriteLine("  1) Client Credentials Flow");
            Console.WriteLine("  2) On-behalf of Flow");
            Console.WriteLine("  3) Device Code Flow");
            Console.WriteLine("  4) Exit");
            Console.Write(">> ");
            var choice = Console.ReadLine();


            switch (choice) 
            {
                case "1":
                    Console.Clear();
                    Console.WriteLine($"{Common.HORIZ_RULE}\nClient Credentials Flow...\n{Common.HORIZ_RULE}");
                    await clientCredsService.GetAccessTokenAsyncCC();
                    break;
                case "2":
                    Console.Clear();
                    Console.WriteLine($"{Common.HORIZ_RULE}\nOn-behalf of Flow...\n{Common.HORIZ_RULE}");
                    Console.WriteLine($"Press Enter the Identity Token ↓↓↓\n{Common.HORIZ_RULE}");
                    var idToken = Console.ReadLine().Trim();
                    await clientCredsService.GetAccessTokenAsyncOBO(idToken);
                    break;
                case "3":
                    Console.Clear();
                    Console.WriteLine($"{Common.HORIZ_RULE}\nDevice Code Flow...\n{Common.HORIZ_RULE}");
                    await clientCredsService.GetAccessTokenAsyncDeviceCode();
                    break;
                case "4":
                    Console.Clear();
                    Console.WriteLine("Later...");
                    return;
                case "":
                    break;
                default:
                    Console.Clear();
                    Console.Error.WriteLine($"{Common.HORIZ_RULE}\nInvalid Choice!\n{Common.HORIZ_RULE}");    
                    break;
            }
            
            Console.WriteLine($"Press <ENTER> to continue...");
            Console.ReadLine();
            Console.Clear();
            await ShowMenuAsync(serviceProvider);
        }
    }
}
