﻿using JobMtaani.Client.Contracts;
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
    public class AdApiController : ApiControllerBase
    {
        private IAdRepository adRepository;

        [ImportingConstructor]
        public AdApiController(IAdRepository adRepository)
        {
            this.adRepository = adRepository;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("GetAd")]
        public HttpResponseMessage GetAd(HttpRequestMessage request, [FromBody]int adId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad account = adRepository.Get(adId);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAds")]
        public HttpResponseMessage GetAds(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad[] ads = adRepository.Get().ToArray();

                response = request.CreateResponse(HttpStatusCode.OK, ads);

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
                newAd.DateCreated = DateTime.Now;
                Ad account = adRepository.Add(newAd);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, account);

                return response;
            });
        }

        [HttpPost]
        [Authorize]
        [Route("Apply")]
        public HttpResponseMessage ApplyToAd(HttpRequestMessage request, [FromBody]int adId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad ad = adRepository.Get(adId);

                ad.AdApplicants.Add(User.Identity.GetUserId());

                adRepository.Update(ad);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, ad);

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

        [HttpPost]
        [AllowAnonymous]
        [Route("GetByCategory")]
        public HttpResponseMessage GetAdByCategory(HttpRequestMessage request, [FromBody]int categoryId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad[] ads = adRepository.GetAdByCategory(categoryId);

                response = request.CreateResponse(HttpStatusCode.OK, ads);

                return response;
            });
        }
    }
}
