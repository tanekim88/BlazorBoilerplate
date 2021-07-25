﻿using Grpc.Core;
using GrpcService1;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace SharedCore.Application.Services.__Entities_Groups_00_Name__Services
{
    public class GreeterService : Greeter.GreeterBase

    {
        private readonly ILogger<GreeterService> _logger;

        public GreeterService(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        public override Task<HelloReply> SayHello(HelloRequest request,
            ServerCallContext context)
        {
            _logger.LogInformation("Saying hello to {Name}", request.Name);
            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }
    }
}
