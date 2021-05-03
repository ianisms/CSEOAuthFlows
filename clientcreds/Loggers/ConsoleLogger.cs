using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace clientcreds.Loggers
{
    public class ConsoleLogger : ILogger
    {
        private readonly string _name;
        private readonly ConsoleLoggerConfig _config;

        public ConsoleLogger(string name,
            ConsoleLoggerConfig config) =>
            (_name, _config) = (name, config);

        public IDisposable BeginScope<TState>(TState state) => default;

        public bool IsEnabled(LogLevel logLevel) =>
            _config.LogLevels.ContainsKey(logLevel);

        public void Log<TState>(LogLevel logLevel,
            EventId eventId,
            TState state,
            Exception exception,
            Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }

            if (_config.EventId == 0 || _config.EventId == eventId.Id)
            {
                ConsoleColor originalColor = Console.ForegroundColor;
                Console.ForegroundColor = _config.LogLevels[logLevel];
                Console.WriteLine($"{formatter(state, exception)}");
                Console.ForegroundColor = originalColor;
            }
        }
    }
}
