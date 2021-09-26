

using System.ComponentModel;



namespace SharedCore.Domain.Enums.AgeEnums
{
    public enum AgeCategoryEnum
    {
        None,

        [Description(description: "< 1 years old.")]
        Infancy, // < 1

        [Description(description: "1 - 3 years old.")]
        ToddlerYears, // 1 - 3

        [Description(description: "4 - 8 years old.")]
        ChildHood, // 4 - 8

        [Description(description: "9 - 13 years old.")]
        Puberty, // 9 - 13

        [Description(description: "14 - 18 years old.")]
        OlderAdolescence, // 14 - 18

        [Description(description: "19 - 30 years old.")]
        AdultHood, // 19 - 30

        [Description(description: "31 - 50 years old.")]
        MiddleAge, // 31 - 50

        [Description(description: "> 50 years old.")]
        SeniorYears // > 50
    }
}