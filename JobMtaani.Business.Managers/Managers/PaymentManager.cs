using JobMtaani.Business.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pesapal.APIHelper;
using JobMtaani.Data.Contracts;
using Core.Common.Contracts;
using JobMtaani.Business.Entities;

namespace JobMtaani.Business.Managers
{
    [Export(typeof(IPaymentManager))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class PaymentManager : IPaymentManager
    {
        ISubscriptionRepository subscriptionRepository;

        [ImportingConstructor]
        public PaymentManager(ISubscriptionRepository subscriptionRepository)
        {
            this.subscriptionRepository = subscriptionRepository;
        }

        public string GetPesapalUrl(Account userAccount)
        {
            Uri pesaPalUri = new Uri("http://demo.pesapal.com/API/PostPesapalDirectOrderV4");
            Uri pesapalCallbackUri = new Uri("http://jobmtaani.co.ke/#/home");
            string SubscriptionPaymentId = ShortGuid.NewShortGuid().Value;

            IBuilder builder = GetApiParameterBuilder(pesaPalUri, pesapalCallbackUri);

            APIHelper<IBuilder> helper = new APIHelper<IBuilder>(builder);
            List<LineItem> lineItems = new List<LineItem>();

            LineItem subscription = new LineItem()
            {
                Particulars = "Subscription",
                UniqueId = SubscriptionPaymentId,
                Quantity = 1,
                UnitCost = 50
            };

            subscription.SubTotal = (subscription.Quantity * subscription.UnitCost);
            lineItems.Add(subscription);

            PesapalDirectOrderInfo webOrder = GetWebOrder(userAccount, SubscriptionPaymentId, lineItems, subscription);

            AddSubscriptionToDB(userAccount, SubscriptionPaymentId);

            string iframeUrl = helper.PostGetPesapalDirectOrderUrl(webOrder);

            return iframeUrl;
        }

        private void AddSubscriptionToDB(Account userAccount, string SubscriptionPaymentId)
        {
            Subscription newSubscriptionEntry = new Subscription()
            {
                SubscriptionPaymentId = SubscriptionPaymentId,
                AccountId = userAccount.Id,
                TransactionDate = DateTime.Now
            };
            subscriptionRepository.Add(newSubscriptionEntry);
        }

        private static IBuilder GetApiParameterBuilder(Uri pesaPalUri, Uri pesapalCallbackUri)
        {
            return new APIPostParametersBuilderV2()
                            .ConsumerKey(@"16OBkxWyEjJImD7ZOufl05rVL/e1x9cK")
                            .ConsumerSecret(@"ZHPwwsQWEyL4N+ufBogpez90Tsc=")
                            .OAuthVersion(EOAuthVersion.VERSION1)
                            .SignatureMethod(ESignatureMethod.HMACSHA1)
                            .SimplePostHttpMethod(EHttpMethod.GET)
                            .SimplePostBaseUri(pesaPalUri)
                            .OAuthCallBackUri(pesapalCallbackUri);
        }

        private static PesapalDirectOrderInfo GetWebOrder(Account userAccount, string SubscriptionPaymentId, List<LineItem> lineItems, LineItem subscription)
        {
            return new PesapalDirectOrderInfo()
            {
                Amount = subscription.SubTotal.ToString(),
                Description = "Subscription",
                Type = "MERCHANT",
                Reference = SubscriptionPaymentId,
                Email = userAccount.Email,
                FirstName = userAccount.FirstName,
                LastName = userAccount.LastName,
                PhoneNumber = userAccount.PhoneNumber,

                LineItems = lineItems
            };
        }
    }
}
