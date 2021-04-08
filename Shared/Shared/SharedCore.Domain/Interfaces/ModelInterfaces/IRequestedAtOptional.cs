

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IRequestedAtOptional
    {
        DateTime? RequestedAt { get; set; }
    }
}