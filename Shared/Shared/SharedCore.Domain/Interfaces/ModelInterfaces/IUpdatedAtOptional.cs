

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IUpdatedAtOptional
    {
        DateTime? UpdatedAt { get; set; }
    }
}