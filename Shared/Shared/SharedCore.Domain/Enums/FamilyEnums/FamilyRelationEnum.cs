

using System.ComponentModel;



namespace SharedCore.Domain.Enums.FamilyEnums
{
    public enum FamilyRelationEnum
    {
        None,
        Mother,
        Father,
        Son,
        Daughter,
        Brother,
        Sister,
        Uncle,
        Aunt,
        Nephew,
        Niece,

        [Description(description: "Cousin (Female)")]
        CousinFemale,

        [Description(description: "Cousin (Male)")]
        CousinMale,
        Grandmother,
        Grandfather,
        Granddaughter,
        Grandson,
        Stepsister,
        Stepbrother,
        Stepmother,
        Stepfather,
        Stepdaughter,
        Stepson,

        [Description(description: "Sister-in-law")]
        SisterInLaw,

        [Description(description: "Brother-in-law")]
        BrotherInLaw,

        [Description(description: "Mother-in-law")]
        MotherInLaw,

        [Description(description: "Father-in-law")]
        FatherInLaw,

        [Description(description: "Daughter-in-law")]
        DaughterInLaw,
        SonInLaw,

        [Description(description: "Sibling (Gender neutral)")]
        Sibling_GenderNeutral,

        [Description(description: "Parent (Gender neutral)")]
        Parent_GenderNeutral,

        [Description(description: "Sibling of parent (Gender neutral)")]
        SiblingOfParent_GenderNeutral,

        [Description(description: "Child of sibling (Gender neutral)")]
        ChildOfSibling_GenderNeutral,

        [Description(description: "Child (Gender neutral)")]
        Child_GenderNeutral,

        [Description(description: "Cousin (Gender neutral)")]
        Cousin_GenderNeutral,

        [Description(description: "Child-in-law (Gender neutral)")]
        ChildInLaw_GenderNeutral,

        [Description(description: "Parent-in-law (Gender neutral)")]
        ParentInLaw_GenderNeutral,

        [Description(description: "Sibling-in-law (Gender neutral)")]
        SiblingInLaw_GenderNeutral,

        [Description(description: "Step parent (Gender neutral)")]
        StepParent_GenderNeutral,

        [Description(description: "Step child (Gender neutral)")]
        StepChild_GenderNeutral,

        [Description(description: "Step sibling (Gender neutral)")]
        StepSibling_GenderNeutral,

        [Description(description: "Family member (Gender neutral)")]
        FamilyMember_GenderNeutral,

        [Description(description: "Pet (Gender neutral)")]
        Pet_GenderNeutral,

        [Description(description: "Pet Owner (Gender neutral)")]
        PetOwner_GenderNeutral
    }
}