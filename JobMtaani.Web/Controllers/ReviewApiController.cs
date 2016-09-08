using JobMtaani.Data.Contracts;
using JobMtaani.Web.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JobMtaani.Web.Controllers
{
    public class ReviewApiController : ApiControllerBase
    {
        public IReviewRepository reviewRepository;
    }
}
