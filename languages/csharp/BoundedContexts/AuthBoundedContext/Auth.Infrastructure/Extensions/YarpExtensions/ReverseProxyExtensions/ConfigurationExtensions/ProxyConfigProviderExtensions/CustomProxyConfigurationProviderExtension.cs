﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Yarp.ReverseProxy.Configuration;

namespace Auth.Infrastructure.Extensions.YarpExtensions.ReverseProxyExtensions.ConfigurationExtensions.ProxyConfigProviderExtensions
{
    public static class CustomProxyConfigurationProviderExtension
    {
        public static IReverseProxyBuilder LoadFromMemory(this IReverseProxyBuilder builder, IReadOnlyList<RouteConfig> routes, IReadOnlyList<ClusterConfig> clusters)
        {
            builder.Services.AddSingleton<IProxyConfigProvider>(new InMemoryConfigProvider(routes, clusters));
            return builder;
        }


    }

    public class InMemoryConfigProvider : IProxyConfigProvider
    {
        // Marked as volatile so that updates are atomic
        private volatile InMemoryConfig _config;

        public InMemoryConfigProvider(IReadOnlyList<RouteConfig> routes, IReadOnlyList<ClusterConfig> clusters)
        {
            _config = new InMemoryConfig(routes, clusters);
        }

        /// <summary>
        /// Implementation of the IProxyConfigProvider.GetConfig method to supply the current snapshot of configuration
        /// </summary>
        /// <returns>An immutable snapshot of the current configuration state</returns>
        public IProxyConfig GetConfig() => _config;

        /// <summary>
        /// Swaps the config state with a new snapshot of the configuration, then signals the change
        /// </summary>
        public void Update(IReadOnlyList<RouteConfig> routes, IReadOnlyList<ClusterConfig> clusters)
        {
            var oldConfig = _config;
            _config = new InMemoryConfig(routes, clusters);
            oldConfig.SignalChange();
        }

        /// <summary>
        /// Implementation of IProxyConfig which is a snapshot of the current config state. The data for this class should be immutable.
        /// </summary>
        private class InMemoryConfig : IProxyConfig
        {
            // Used to implement the change token for the state
            private readonly CancellationTokenSource _cts = new CancellationTokenSource();

            public InMemoryConfig(IReadOnlyList<RouteConfig> routes, IReadOnlyList<ClusterConfig> clusters)
            {
                Routes = routes;
                Clusters = clusters;
                ChangeToken = new CancellationChangeToken(_cts.Token);
            }

            /// <summary>
            /// A snapshot of the list of routes for the proxy
            /// </summary>
            public IReadOnlyList<RouteConfig> Routes { get; }

            /// <summary>
            /// A snapshot of the list of Clusters which are collections of interchangable destination endpoints
            /// </summary>
            public IReadOnlyList<ClusterConfig> Clusters { get; }

            /// <summary>
            /// Fired to indicate the the proxy state has changed, and that this snapshot is now stale
            /// </summary>
            public IChangeToken ChangeToken { get; }

            internal void SignalChange()
            {
                _cts.Cancel();
            }
        }
    }
}
