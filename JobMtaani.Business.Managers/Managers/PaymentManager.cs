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

namespace JobMtaani.Business.Managers.Managers
{
    [Export(typeof(IPaymentManager))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class PaymentManager : IPaymentManager
    {
        IDataRepositoryFactory dataRepositoryFactory;

        [ImportingConstructor]
        public PaymentManager(IDataRepositoryFactory dataRepositoryFactory)
        {
            this.dataRepositoryFactory = dataRepositoryFactory;
        }
        public string GetPesapalUrl(string userId)
        {
            Uri pesaPalUri = new Uri("http://demo.pesapal.com/API/PostPesapalDirectOrderV4");
            Uri pesapalCallbackUri = new Uri("http://jobmtaani.co.ke/#/home");

            IBuilder builder = new APIPostParametersBuilderV2()
                .ConsumerKey(@"16OBkxWyEjJImD7ZOufl05rVL/e1x9cK")
                .ConsumerSecret(@"ZHPwwsQWEyL4N+ufBogpez90Tsc=")
                .OAuthVersion(EOAuthVersion.VERSION1)
                .SignatureMethod(ESignatureMethod.HMACSHA1)
                .SimplePostHttpMethod(EHttpMethod.GET)
                .SimplePostBaseUri(pesaPalUri)
                .OAuthCallBackUri(pesapalCallbackUri);

            APIHelper<IBuilder> helper = new APIHelper<IBuilder>(builder);
            IList<LineItem> lineItems = new List<LineItem>();

            LineItem subscription = new LineItem() { };

            return "";
        }
    }
}
