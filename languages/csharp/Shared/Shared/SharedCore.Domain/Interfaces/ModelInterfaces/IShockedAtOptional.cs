

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IShockedAtOptional
    {
        DateTime? ShockedAt { get; set; }
    }
}