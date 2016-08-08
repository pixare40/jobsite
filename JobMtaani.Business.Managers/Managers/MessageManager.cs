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

        private static SmtpClient CreateSmtpClient()
        {
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("kabzegara@gmail.com", "miriam12");
            return client;
        }

        public Message SendHiredMessage(AdApplication adApplication, Account jobOwner, Account hiredEmployee)
        {
            SmtpClient client = CreateSmtpClient();

            string jobApplicationSuccessfulMessage = string.Format(@"Your Job Application to job number {0} was 
                                                       succesfull, Please log on to http://www.jobmtaani.co.ke/#/profile to view succesful applications, meanwhile expect a call from {1} on {2}",
                                                       adApplication.AdId, jobOwner.FirstName, jobOwner.PhoneNumber);

            string hiredEmployeeDetailsMessage = string.Format(@"You have hired a new employee, call or text {0} on {2} to set up a meeting",
                hiredEmployee.FirstName, hiredEmployee.PhoneNumber);

            SendEmailMessage(client, hiredEmployee.Email, jobApplicationSuccessfulMessage);
            SendEmailMessage(client, jobOwner.Email, hiredEmployeeDetailsMessage);

            Message message = new Message();

            return message;
        }

        public Message NewJobApplicationMessage(AdApplication adApplication, Account jobOwner, Account jobApplicant)
        {
            SmtpClient client = CreateSmtpClient();

            Ad ad = this.adRepository.Get(adApplication.AdId);

            string newJobApplicationMessage = string.Format(@"Your have applied to job titled {0} Please log on to http://www.jobmtaani.co.ke/#/profile to all applications, we will notify you if the application is succesful",
                                                       ad.AdTitle);

            string newPotentialHireJobApplication = string.Format(@"There has been a new application to the position you opened titled {0} log on to  http://www.jobmtaani.co.ke/#/profile to view all applications",
                ad.AdTitle);

            SendEmailMessage(client, jobApplicant.Email, newJobApplicationMessage);
            SendEmailMessage(client, jobOwner.Email, newPotentialHireJobApplication);

            Message message = new Message();

            return message;
        }

        private static void SendEmailMessage(SmtpClient client,string sendTo, string messageToSend)
        {
            MailMessage message = new MailMessage("donotreply@jobmtaani.co.ke", sendTo, "Job Mtaani job application",
                            messageToSend);

            message.BodyEncoding = Encoding.UTF8;
            message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            client.Send(message);
        }
    }

    public interface IMessageManager
    {
        Message SendHiredMessage(AdApplication adApplication, Account jobOwner, Account hiredEmployee);
        Message NewJobApplicationMessage(AdApplication adApplication, Account jobOwner, Account jobApplicant);
    }
}
