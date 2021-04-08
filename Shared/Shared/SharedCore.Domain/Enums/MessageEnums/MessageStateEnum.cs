

using System;



namespace SharedCore.Domain.Enums.MessageEnums
{
    [Flags]
    public enum MessageStateEnum
    {
        Read,
        Liked,
        Disliked,
        Shocked
    }
}