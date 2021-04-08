

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IDislikedAtOptional
    {
        DateTime? DislikedAt { get; set; }
    }
}