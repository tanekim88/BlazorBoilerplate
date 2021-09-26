

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//%t:begin Intro

//%t:end Intro



namespace Core.Domain.Entities.ReferenceEntities
{
    public class EnumReference
    {
        [Key] [Column(Order = 0)] public string Type { get; set; }


        [Key] [Column(Order = 1)] public int Value { get; set; }


        public string Description { get; set; }
    }
}