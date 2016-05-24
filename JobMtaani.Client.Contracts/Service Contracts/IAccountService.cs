using Core.Common.Contracts;
using Core.Common.Exceptions;
using JobMtaani.Client.Entities;
using JobMtaani.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Contracts
{
    [ServiceContract]
    public interface IAccountService : IServiceContract
    {
        [OperationContract]
        [FaultContract(typeof(NotFoundException))]
        [FaultContract(typeof(AuthorizationValidationException))]
        Account GetCustomerAccountInfo(string loginEmail);

        [OperationContract]
        Task<Account> GetCustomerInfoAsync(string loginEmail);
    }
}
