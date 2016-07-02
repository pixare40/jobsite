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
    [Export(typeof(MessageApiController))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    [Authorize]
    [RoutePrefix("api/message")]
    [UsesDisposableService]
    public class MessageApiController : ApiControllerBase
    {
        private IMessageRepository messageRepository;

        [ImportingConstructor]
        public MessageApiController(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }

        [HttpPost]
        [Route("SendMessage")]
        public HttpResponseMessage SendMessage(HttpRequestMessage request, Message message)
        {
            return GetHttpResponse(request, () =>{
                HttpResponseMessage response = null;

                Message addedMessage = messageRepository.Add(message);

                response = request.CreateResponse(HttpStatusCode.OK, message);

                return response;
            });
        }

        [HttpGet]
        [Route("GetSentMessages")]
        public HttpResponseMessage GetSentMessages(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                string currentUser = User.Identity.GetUserId();

                IEnumerable<Message> messages = messageRepository.GetSentMessages(currentUser);

                response = request.CreateResponse(HttpStatusCode.OK, messages);

                return response;
            });
        }

        [HttpGet]
        [Route("GetReceivedMessages")]
        public HttpResponseMessage GetReceivedMessages(HttpRequestMessage request)
        {
            return GetHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                string currentUser = User.Identity.GetUserId();

                IEnumerable<Message> messages = messageRepository.GetReceivedMessages(currentUser);

                response = request.CreateResponse(HttpStatusCode.OK, messages);

                return response;
            });
        }
    }
}
