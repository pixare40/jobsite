using Core.Common.Contracts;
using JobMtaani.Business.Entities;
using JobMtaani.Business.Managers;
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

        [ImportingConstructor]
        public SearchApiController(ISearchManager searchManager)
        {
            this.searchManager = searchManager;
        }

        [Route("Search")]
        [AllowAnonymous]
        [HttpGet]
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

    }
}
