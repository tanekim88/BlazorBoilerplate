

using System;



namespace SharedCore.Domain.Enums.JobEnums
{
    [Flags]
    public enum JobRoleEnum
    {
        None,
        JobApplicant,
        JobEmployee,
        JobRecruiter
    }
}