﻿

using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;


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
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Tane Kim", "tanekim77@hotmail.com"));
            message.To.Add(new MailboxAddress("Customer", email));
            message.Subject = subject;

            message.Body = new TextPart("plain")
            {
                Text = htmlMessage
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp-mail.outlook.com", 587);

                // Note: only needed if the SMTP server requires authentication
                await client.AuthenticateAsync("tanekim77@hotmail.com", "Email@1423");

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}