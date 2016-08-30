﻿using Core.Common.Contracts;
using JobMtaani.Business.Entities;
using JobMtaani.Business.Managers;
using JobMtaani.Data.Contracts;
using JobMtaani.Web.Core;
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
    [RoutePrefix("api/search")]
    [UsesDisposableService]
    public class SearchApiController : ApiControllerBase
    {
        private ISearchManager searchManager;
        private ILocationRepository locationRepository;

        [ImportingConstructor]
        public SearchApiController(ISearchManager searchManager, ILocationRepository locationRepository)
        {
            this.searchManager = searchManager;
            this.locationRepository = locationRepository;
        }

        [HttpGet]
        [Route("Search")]
        [AllowAnonymous]
        public HttpResponseMessage Search(HttpRequestMessage request, [FromUri]string term, [FromUri]int location)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad[] searchResults = searchManager.Search(term, location);

                response = request.CreateResponse(HttpStatusCode.OK, searchResults);

                return response;
            });
        }

        [HttpGet]
        [Route("GetLocations")]
        [AllowAnonymous]
        public HttpResponseMessage GetLocations(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Location[] locations = locationRepository.Get().ToArray();

                response = request.CreateResponse(HttpStatusCode.OK, locations);

                return response;
            });
        }

    }
}
