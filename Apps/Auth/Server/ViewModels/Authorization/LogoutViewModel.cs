

using Microsoft.AspNetCore.Mvc.ModelBinding;



namespace Auth.Server.ViewModels.Authorization
{
    public class LogoutViewModel
    {
        [BindNever] public string RequestId { get; set; }
    }
}