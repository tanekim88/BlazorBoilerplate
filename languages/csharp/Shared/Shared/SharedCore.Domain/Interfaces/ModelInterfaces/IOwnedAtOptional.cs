

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IOwnedAtOptional
    {
        DateTime? OwnedAt { get; set; }
    }
}