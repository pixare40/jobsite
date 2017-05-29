using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using JobMtaani.Web.Models;
using JobMtaani.Data;
using JobMtaani.Business.Entities;
using RestSharp;
using RestSharp.Authenticators;
using System.ComponentModel.Composition;
using System;

namespace JobMtaani.Web
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<Account>
    {
        public ApplicationUserManager(IUserStore<Account> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<Account>(context.Get<JobMtaaniDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<Account>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 4,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<Account>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            manager.EmailService = new EmailManager();

            return manager;
        }
    }

    public class EmailManager : IIdentityMessageService
    {
        public EmailManager()
        {

        }

        public Task SendAsync(IdentityMessage message)
        {
            RestClient restclient = new RestClient();
            restclient.BaseUrl = new Uri("https://api.mailgun.net/v3");
            restclient.Authenticator =
                    new HttpBasicAuthenticator("api",
                                               "key-8e75e1172a6db68ad916d00668843662");
            RestRequest request = new RestRequest();
            request.AddParameter("domain",
                                 "jobmtaani.co.ke", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Job Mtaani <mailgun@jobmtaani.co.ke>");
            request.AddParameter("to", message.Destination);
            request.AddParameter("subject", message.Subject);
            request.AddParameter("text", message.Body);
            request.Method = Method.POST;
            return restclient.ExecuteTaskAsync(request);
        }
    }
}
