using JobMtaani.Business.Contracts;
using JobMtaani.Business.Entities;
using JobMtaani.Web.Core;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JobMtaani.Web.Controllers
{
    [Export]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    [RoutePrefix("api/Payment")]
    [Authorize]
    public class PaymentApiController : ApiControllerBase
    {
        private IPaymentManager paymentManager;
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [ImportingConstructor]
        public PaymentApiController(IPaymentManager paymentManager)
        {
            this.paymentManager = paymentManager;
        }

        [HttpGet]
        [Route("GetPaymentUrl")]
        public HttpResponseMessage GetPesaPalUrl(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Account currentUserAccount = UserManager.FindById(User.Identity.GetUserId());

                string iframeUrl = paymentManager.GetPesapalUrl(currentUserAccount);

                response = request.CreateResponse(HttpStatusCode.OK, iframeUrl);

                return response;
            });
        }
    }
}
