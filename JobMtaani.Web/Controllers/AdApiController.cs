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
using JobMtaani.Web.Models;
using Microsoft.AspNet.Identity.Owin;
using JobMtaani.Business.Managers;

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
        private IAdApplicationRepository adApplicationRespository;
        private ICategoryRepository categoryRepository;
        private IMessageManager messageManager;

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
        public AdApiController(IAdRepository adRepository, IAdApplicationRepository adApplicationRespository, 
            ICategoryRepository categoryRepository, IMessageManager messageManager)
        {
            this.adRepository = adRepository;
            this.adApplicationRespository = adApplicationRespository;
            this.categoryRepository = categoryRepository;
            this.messageManager = messageManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("GetByLocation")]
        public HttpResponseMessage GetByLocation(HttpRequestMessage request, [FromBody]string location)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad[] adsByLocation = this.adRepository.GetByLocation(location);

                response = request.CreateResponse(HttpStatusCode.OK, adsByLocation);

                return response;
            });
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

        [HttpPost]
        [AllowAnonymous]
        [Route("CloseAd")]
        public HttpResponseMessage CloseAd(HttpRequestMessage request, [FromBody]int adId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad ad = adRepository.Get(adId);

                ad.AdClosed = true;

                adRepository.Update(ad);

                response = request.CreateResponse<Ad>(HttpStatusCode.OK, ad);

                return response;
            });
        }

        [HttpGet]
        [Authorize]
        [Route("GetPersonalAds")]
        public HttpResponseMessage GetPersonalAds(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad[] ads = adRepository.GetPersonalAds(User.Identity.GetUserId());

                response = request.CreateResponse(HttpStatusCode.OK, ads);

                return response;
            });
        }

        [HttpGet]
        [Authorize]
        [Route("GetNewsFeed")]
        public HttpResponseMessage GetNewsFeed(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                string userId = User.Identity.GetUserId();

                List<NewsFeedModel> newsFeedModel = new List<NewsFeedModel>();
                List<Ad> ads = new List<Ad>();

                List<AdApplication> adApplications = adApplicationRespository.FindUserAdApplications(userId);

                foreach(var adapplication in adApplications)
                {
                    NewsFeedModel newsFeedItem = new NewsFeedModel();
                    Ad newsfeedad = adRepository.Get(adapplication.AdId);

                    newsFeedItem.AdDetails = newsfeedad;
                    newsFeedItem.AdApplication = adapplication;

                    newsFeedModel.Add(newsFeedItem);
                }

                response = request.CreateResponse(HttpStatusCode.OK, newsFeedModel);

                return response;
            });
        }

        [HttpPost]
        [Authorize]
        [Route("HireEmployee")]
        public HttpResponseMessage HireEmployee(HttpRequestMessage request, HireModel hireModel)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                string applicantId = UserManager.FindByName(hireModel.UserName).Id;
                AdApplication adApplication = adApplicationRespository.FindbyHireModel(applicantId, hireModel.AdId);
                Ad closedAd = adRepository.Get(hireModel.AdId);

                Account applicant = UserManager.FindById(applicantId);
                Account jobOwner = UserManager.FindById(closedAd.AccountId);

                if(adApplication.AdApplicantId == closedAd.AccountId)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, adApplication);
                    return response;
                }
                else
                {
                    adApplication.Status = ApplicationStatus.Accepted;
                    adApplication.DateClosed = DateTime.Now;
                    closedAd.AdClosed = true;

                    adApplicationRespository.Update(adApplication);
                    adRepository.Update(closedAd);

                    this.messageManager.SendHiredMessage(adApplication,jobOwner, applicant);

                    response = request.CreateResponse(HttpStatusCode.OK, adApplication);

                    return response;
                }
            });
        }

        [HttpPost]
        [Authorize]
        [Route("GetAdDetails")]
        public HttpResponseMessage GetAdDetails(HttpRequestMessage request, [FromBody]int adId)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                Ad ad = adRepository.Get(adId);
                AdDetailsModel adDetails = new AdDetailsModel();
                List<string> adApplicantUserIds = new List<string>();

                adDetails.AdDetails = ad;

                adApplicantUserIds = adApplicationRespository.GetAdApplicant(ad.AdId);

                foreach (var adApplicant in adApplicantUserIds)
                {
                    Account account = UserManager.FindById(adApplicant);
                    if(account == null)
                    {
                        continue;
                    }

                    UserAccountModel userAccountModel = new UserAccountModel()
                    {
                        Email = account.Email,
                        FirstName = account.FirstName,
                        LastName = account.LastName,
                        UserName = account.UserName,
                        SubscriptionStatus = account.SubscriptionStatus,
                        PhoneNumber = account.PhoneNumber
                    };

                    adDetails.AdApplicantDetails.Add(userAccountModel);
                }

                response = request.CreateResponse(HttpStatusCode.OK, adDetails);

                return response;
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetTopAds")]
        public HttpResponseMessage GetTopAds(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () => {
                HttpResponseMessage response = null;
                Ad[] ads = adRepository.GetTopAds();

                foreach (var ad in ads)
                {
                    ad.IconClass = categoryRepository.Get(ad.CategoryId).IconClass;
                    ad.CategoryName = categoryRepository.Get(ad.CategoryId).CategoryCName;
                }

                response = request.CreateResponse(HttpStatusCode.OK, ads);
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

                Ad[] ads = adRepository.GetApplyAds(User.Identity.GetUserId());

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
                newAd.AdClosed = false;
                if(newAd.CategoryId == 0)
                {
                    newAd.CategoryId = 4;
                }

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

                string userId = User.Identity.GetUserId();

                AdApplication adApplication = new AdApplication() {
                    AdApplicantId = userId, AdId = ad.AdId, DateApplied=DateTime.Now, Status=ApplicationStatus.Open };

                AdApplication existingAdApplication = adApplicationRespository.FindbyHireModel(userId, adId);

                if(existingAdApplication != null)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, adApplication);

                    return response;
                }
                else
                {
                    adApplicationRespository.Add(adApplication);

                    Account applicant = UserManager.FindById(adApplication.AdApplicantId);
                    Account jobOwner = UserManager.FindById(ad.AccountId);

                    messageManager.NewJobApplicationMessage(adApplication, jobOwner, applicant);

                    response = request.CreateResponse(HttpStatusCode.OK, adApplication);

                    return response;
                }
                
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

        [HttpGet]
        [Authorize]
        [Route("GetLocalJobs")]
        public HttpResponseMessage GetLocalAds(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                string userId = User.Identity.GetUserId();

                Ad[] ads;

                Account currentUserAccount = UserManager.FindById(userId);

                if (string.IsNullOrEmpty(currentUserAccount.Location))
                {
                    ads = adRepository.GetByLocation(userId);
                }
                else
                {
                    ads = adRepository.GetByLocation(currentUserAccount.Id,currentUserAccount.Location);
                }

                response = request.CreateResponse(HttpStatusCode.OK, ads);

                return response;
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }
    }
}
