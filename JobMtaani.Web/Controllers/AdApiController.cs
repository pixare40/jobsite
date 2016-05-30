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
using JobMtaani.Client.Entities;

namespace JobMtaani.Web.Controllers
{
    [Export]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    [RoutePrefix("api/ad")]
    [AllowAnonymous]
    [UsesDisposableService]
    public class AdApiController : ApiControllerBase
    {
        private IAdService adService;

        [ImportingConstructor]
        public AdApiController(IAdService adService)
        {
            this.adService = adService;
        }

        protected override void RegisterServices(List<IServiceContract> disposableServices)
        {
            disposableServices.Add(adService);
        }

        [HttpGet]
        [Route("getad")]
        public HttpResponseMessage GetAd(HttpRequestMessage request, int adId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad account = adService.GetAd(adId);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }

        [HttpPost]
        [Route("createad")]
        public HttpResponseMessage CreateNewAd(HttpRequestMessage request, Ad newAd)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad account = adService.CreateAd(newAd,"kabajie");

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }

        [HttpPost]
        [Route("updatead")]
        public HttpResponseMessage UpdateAd(HttpRequestMessage request, Ad updatedAd)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad account = adService.UpdateAd(updatedAd, "kabajie");

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }
    }
}
