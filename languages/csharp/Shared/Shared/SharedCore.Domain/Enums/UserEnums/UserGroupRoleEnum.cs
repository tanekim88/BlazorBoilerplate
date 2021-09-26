

using System;



namespace SharedCore.Domain.Enums.UserEnums
{
    [Flags]
    public enum UserGroupRoleEnum
    {
        None,
        Leader,
        ViceLeader,
        Maintainer
    }
}