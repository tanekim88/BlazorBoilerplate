

using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;



namespace Core.Infrastructure.Emails
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailsConfiguration _configuration;
        private readonly ILogger _logger;


        public EmailSender(
            ILogger logger,
            EmailsConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
        }
    }
}