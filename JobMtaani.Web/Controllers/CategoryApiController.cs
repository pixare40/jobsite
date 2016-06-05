using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using JobMtaani.Web.Core;
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
    [RoutePrefix("api/category")]
    [UsesDisposableService]
    public class CategoryApiController : ApiControllerBase
    {
        private ICategoryRepository categoryRepository;

        [ImportingConstructor]
        public CategoryApiController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpPost]
        [Authorize]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("CreateCategory")]
        public HttpResponseMessage CreateNewCategory(HttpRequestMessage request, Category category)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Category newcategory = categoryRepository.Add(category);

                response = request.CreateResponse(HttpStatusCode.OK, newcategory);

                return response;
            } );
        }

        [HttpPost]
        [Route("GetAll")]
        public HttpResponseMessage GetAllCategories(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                IEnumerable<Category> categories = categoryRepository.Get();

                response = request.CreateResponse(HttpStatusCode.OK, categories);

                return response;
            });
        }

    }
}
