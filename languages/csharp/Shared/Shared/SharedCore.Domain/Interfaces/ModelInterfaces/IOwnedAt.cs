

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IOwnedAt
    {
        DateTime OwnedAt { get; set; }
    }
}