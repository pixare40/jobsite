using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Net.Mail;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.ComponentModel;
using RestSharp;
using RestSharp.Authenticators;

namespace JobMtaani.Business.Managers
{
    [Export(typeof(IMessageManager))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class MessageManager: IMessageManager
    {
        private IAdRepository adRepository;
        private IAdApplicationRepository adApplicationRepository;
        private IMessageRepository messagesRepository;

        [ImportingConstructor]
        public MessageManager(IAdRepository adRepo, IAdApplicationRepository adApplicationRepo, IMessageRepository messageRepo)
        {
            adApplicationRepository = adApplicationRepo;
            adRepository = adRepo;
            messagesRepository = messageRepo;
        }

        public async Task<bool> SendHiredMessage(AdApplication adApplication, Account jobOwner, Account hiredEmployee)
        {
            string jobApplicationSuccessfulMessage = string.Format(@"Your Job Application to job number {0} was succesfull, Please log on to http://www.jobmtaani.co.ke/#/profile to view succesful applications, meanwhile expect a call from {1} on {2}",
                                                       adApplication.AdId, jobOwner.FirstName, jobOwner.PhoneNumber);

            string hiredEmployeeDetailsMessage = string.Format(@"You have hired a new employee, call or text {0} on {1} to set up a meeting",
                hiredEmployee.FirstName, hiredEmployee.PhoneNumber);

            await SendEmailMessage(hiredEmployee.Email, jobApplicationSuccessfulMessage);
            await SendEmailMessage(jobOwner.Email, hiredEmployeeDetailsMessage);

            return true;
        }

        public async Task<bool> NewJobApplicationMessage(AdApplication adApplication, Account jobOwner, Account jobApplicant)
        {
            Ad ad = this.adRepository.Get(adApplication.AdId);

            string newJobApplicationMessage = string.Format(@"Your have applied to job titled {0} Please log on to http://www.jobmtaani.co.ke/#/profile to all applications, we will notify you if the application is succesful",
                                                       ad.AdTitle);

            string newPotentialHireJobApplication = string.Format(@"There has been a new application to the position you opened titled {0} log on to  http://www.jobmtaani.co.ke/#/profile to view all applications",
                ad.AdTitle);

            await SendEmailMessage(jobApplicant.Email, newJobApplicationMessage);
            await SendEmailMessage(jobOwner.Email, newPotentialHireJobApplication);

            return true;
        }

        private async Task<IRestResponse> SendEmailMessage(string sendTo, string messageToSend)
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
            request.AddParameter("to", sendTo);
            request.AddParameter("subject", "Job Mtaani Job Activity");
            request.AddParameter("text", messageToSend);
            request.Method = Method.POST;
            IRestResponse x = await restclient.ExecuteTaskAsync(request);
            return x;
        }

        private void OnRestCallExecuted(IRestResponse arg1, RestRequestAsyncHandle arg2)
        {
            //ignore callback
        }
    }

    public interface IMessageManager
    {
        Task<bool> SendHiredMessage(AdApplication adApplication, Account jobOwner, Account hiredEmployee);
        Task<bool> NewJobApplicationMessage(AdApplication adApplication, Account jobOwner, Account jobApplicant);
    }
}
