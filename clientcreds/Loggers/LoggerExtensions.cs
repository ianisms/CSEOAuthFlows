using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Configuration;

namespace clientcreds.Loggers
{
    public static class LoggerExtensions
    {
        public static ILoggingBuilder AddConsoleLogger(
            this ILoggingBuilder builder)
        {
            builder.AddConfiguration();

            builder.Services.TryAddEnumerable(
                ServiceDescriptor.Singleton<ILoggerProvider, ConsoleLoggerProvider>());

            LoggerProviderOptions.RegisterProviderOptions
                <ConsoleLoggerConfig, ConsoleLoggerProvider>(builder.Services);

            return builder;
        }

        public static ILoggingBuilder AddConsoleLogger(
            this ILoggingBuilder builder,
            Action<ConsoleLoggerConfig> configure)
        {
            builder.AddConsoleLogger();
            builder.Services.Configure(configure);

            return builder;
        }
    }
}
