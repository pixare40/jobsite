using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security;
using System.ServiceModel;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using JobMtaani.Common;
using Core.Common.Contracts;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace JobMtaani.Web.Core
{
    public class ApiControllerBase : ApiController
    {
        List<IServiceContract> _DisposableServices;

        protected virtual void RegisterServices(List<IServiceContract> disposableServices)
        {
        }

        void RegisterDisposableServices(List<IServiceContract> disposableServices)
        {
            RegisterServices(disposableServices);
        }

        List<IServiceContract> DisposableServices
        {
            get
            {
                if (_DisposableServices == null)
                    _DisposableServices = new List<IServiceContract>();

                return _DisposableServices;
            }
        }

        protected void ValidateAuthorizedUser(string userRequested)
        {
            string userLoggedIn = User.Identity.GetUserId();
            if (userLoggedIn != userRequested)
                throw new SecurityException("Attempting to access data for another user.");
        }

        protected HttpResponseMessage GetHttpResponse(HttpRequestMessage request, Func<HttpResponseMessage> codeToExecute)
        {
            HttpResponseMessage response = null;

            try
            {
                response = codeToExecute.Invoke();
            }
            catch (SecurityException ex)
            {
                response = request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (FaultException<AuthorizationValidationException> ex)
            {
                response = request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (FaultException ex)
            {
                response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

            return response;
        }

        protected async Task<HttpResponseMessage> GetHttpResponseAsync(HttpRequestMessage request, Func<Task<HttpResponseMessage>> codeToExecute)
        {
            HttpResponseMessage response = null;

            try
            {
                response = await codeToExecute.Invoke();
            }
            catch (SecurityException ex)
            {
                response = request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (FaultException<AuthorizationValidationException> ex)
            {
                response = request.CreateResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (FaultException ex)
            {
                response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                response = request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

            return response;
        }
    }
}