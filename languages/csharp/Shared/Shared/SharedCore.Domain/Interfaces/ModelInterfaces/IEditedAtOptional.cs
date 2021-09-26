

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IEditedAtOptional
    {
        DateTime? EditedAt { get; set; }
    }
}