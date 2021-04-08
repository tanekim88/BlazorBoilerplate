

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ICreatedAtOptional
    {
        DateTime? CreatedAt { get; set; }
    }
}