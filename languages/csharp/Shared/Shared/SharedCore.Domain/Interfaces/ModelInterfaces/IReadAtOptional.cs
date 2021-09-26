

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IReadAtOptional
    {
        DateTime? ReadAt { get; set; }
    }
}