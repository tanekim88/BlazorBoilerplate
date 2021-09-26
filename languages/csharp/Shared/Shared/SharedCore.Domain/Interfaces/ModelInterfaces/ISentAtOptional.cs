

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ISentAtOptional
    {
        DateTime? SentAt { get; set; }
    }
}