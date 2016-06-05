using JobMtaani.Client.Contracts;
using JobMtaani.Web.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Core.Common.Contracts;
using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using Microsoft.AspNet.Identity;

namespace JobMtaani.Web.Controllers
{
    [Export]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    [RoutePrefix("api/ad")]
    [Authorize]
    [UsesDisposableService]
    public class AdApiController : ApiControllerBase
    {
        private IAdRepository adRepository;

        [ImportingConstructor]
        public AdApiController(IAdRepository adRepository)
        {
            this.adRepository = adRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("getad")]
        public HttpResponseMessage GetAd(HttpRequestMessage request, int adId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad account = adRepository.Get(adId);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }

        [HttpPost]
        [Authorize]
        [Route("CreateAd")]
        public HttpResponseMessage CreateNewAd(HttpRequestMessage request, Ad newAd)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                newAd.AccountId = User.Identity.GetUserId();
                Ad account = adRepository.Add(newAd);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }

        [HttpPost]
        [Authorize]
        [Route("updatead")]
        public HttpResponseMessage UpdateAd(HttpRequestMessage request, Ad updatedAd)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad account = adRepository.Update(updatedAd);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }
    }
}
