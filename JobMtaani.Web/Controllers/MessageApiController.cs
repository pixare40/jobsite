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
    [Export(typeof(MessageApiController))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    [UsesDisposableService]
    [Authorize]
    [RoutePrefix("api/message")]
    public class MessageApiController : ApiControllerBase
    {

    }
}
