using Core.Common.Contracts;
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
    public class SearchApiController : ApiControllerBase
    {
        private IDataRepositoryFactory dataRepositoryFactory;

        [ImportingConstructor]
        public SearchApiController(IDataRepositoryFactory dataRepositoryFactory)
        {
            this.dataRepositoryFactory = dataRepositoryFactory;
        }


    }
}
