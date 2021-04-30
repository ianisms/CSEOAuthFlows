using System.Collections.Generic;

namespace clientcreds
{
    public class ClientCredsConfig 
    {
        public string TenantId { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public IEnumerable<string> Scopes { get; set; }
    }
}