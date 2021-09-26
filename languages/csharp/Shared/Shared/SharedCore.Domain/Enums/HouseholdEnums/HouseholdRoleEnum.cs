

using System;



namespace SharedCore.Domain.Enums.HouseholdEnums
{
    [Flags]
    public enum HouseholdRoleEnum
    {
        None,
        Roommate,
        Dependent
    }
}