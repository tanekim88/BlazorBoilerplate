

using System;
using System.ComponentModel.DataAnnotations;



namespace SharedCore.Application.Models.TextMessageProviderModels.TwilioModels
{
    public class TwilioVerifySettingModel 
    {
        [Key] public int Id { get; set; }
        public string VerifyServiceSid { get; set; }
    }
}