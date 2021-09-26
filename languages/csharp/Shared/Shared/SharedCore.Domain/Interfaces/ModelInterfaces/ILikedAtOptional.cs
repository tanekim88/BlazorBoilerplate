

using System;



namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ILikedAtOptional
    {
        DateTime? LikedAt { get; set; }
    }
}