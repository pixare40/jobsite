using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using JobMtaani.Web.Core;
using JobMtaani.Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
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
    [RoutePrefix("api/Review")]
    [Authorize]
    [UsesDisposableService]
    public class ReviewApiController : ApiControllerBase
    {
        public IReviewRepository reviewRepository;

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
        public ReviewApiController(IReviewRepository reviewRepository)
        {
            this.reviewRepository = reviewRepository;
        }

        [HttpPost]
        [Route("SaveReview")]
        public HttpResponseMessage SaveReview(HttpRequestMessage request, [FromBody]Review review)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                if(review == null)
                {
                    return response = request.CreateResponse(HttpStatusCode.BadRequest, review);
                }
                review.DateCreated = DateTime.Now;

                Review addedReview = reviewRepository.Add(review);

                response = request.CreateResponse(HttpStatusCode.OK, addedReview);

                return response;
            });
        }

        [HttpGet]
        [Route("GetReview")]
        public HttpResponseMessage GetReview(HttpRequestMessage request, [FromUri]string uid)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Account user = UserManager.FindById(uid);

                int currentRating = user.CurrentRating;

                response = request.CreateResponse(HttpStatusCode.OK, currentRating);

                return response;
            });
        }

        [HttpGet]
        [Route("GetReviews")]
        public HttpResponseMessage GetReviews(HttpRequestMessage request, [FromUri]string uid, [FromUri]int page)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Review[] userReviews = reviewRepository.GetUserReviews(uid, page);

                int totalReviews = reviewRepository.GetTotalUserReviews(uid);

                ReviewModel reviewModel = new ReviewModel() { TotalReviews = totalReviews, Reviews = userReviews };

                response = request.CreateResponse(HttpStatusCode.OK, reviewModel);

                return response;
            });
        }
    }
}
