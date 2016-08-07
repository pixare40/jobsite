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

        public Message SendMessage(AdApplication adApplication)
        {
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("kabzegara@gmail.com", "miriam12");

            MailMessage mm = new MailMessage("donotreply@jobmtaani.co.ke", "kabajiegara@live.com", "test message", "test message");
            mm.BodyEncoding = Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            client.Send(mm);

            Message message = new Message();

            return message;
        }
    }

    public interface IMessageManager
    {
        Message SendMessage(AdApplication adApplication);
    }
}
