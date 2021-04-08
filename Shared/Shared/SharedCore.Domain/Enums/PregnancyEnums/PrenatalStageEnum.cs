

using System.ComponentModel;



namespace SharedCore.Domain.Enums.PregnancyEnums
{
    public enum PrenatalStageEnum
    {
        None,

        [Description(description: "Firtilized")]
        Germinal_Day1,
        [Description(description: "Cleavage")] Germinal_Day2,
        [Description(description: "Morula")] Germinal_Day4,

        [Description(description: "Blastocyst")]
        Germinal_Day5,

        [Description(description: "Blastocyst Implants in the endometrium of the uterus.")]
        Germinal_Day8,

        [Description(description: "Embryonic Disc")]
        EmbryonicStage_Day9,

        [Description(description: "Gastrulation")]
        EmbryonicStage_Week2,

        [Description(description: "Neurulation")]
        EmbryonicStage_Week3,

        [Description(description: "Organogenesis: C shape")]
        EmbryonicStage_Week5,

        [Description(description: "Organogenesis: Eyes and nose develop, stomach start to develop.")]
        EmbryonicStage_Week6,

        [Description(description: "Organogenesis: Lung begins to form.")]
        EmbryonicStage_Week7,

        [Description(description: "Organogenesis: Nipples and hair follicles begins to develop.")]
        EmbryonicStage_Week8,

        [Description(description: "Fetal Stage begins.")]
        FetalStage_Week9,

        [Description(description: "Sex organs differentiate.")]
        FetalStage_Week12,

        [Description(description: "Fingers and toes develop.")]
        FetalStage_Week16,

        [Description(description: "Hearing begins")]
        FetalStage_Week20,

        [Description(description: "Lungs begin to develop.")]
        FetalStage_Week24,

        [Description(description: "Brains grow rapidly.")]
        FetalStage_Week28,

        [Description(description: "Bones fully develop.")]
        FetalStage_Week32,

        [Description(description: "Muscles fully develop.")]
        FetalStage_Week36,

        [Description(description: "Full-term development.")]
        FetalStage_Week40
    }
}