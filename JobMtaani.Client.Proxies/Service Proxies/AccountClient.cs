using JobMtaani.Client.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using JobMtaani.Client.Entities;
using System.ComponentModel.Composition;
using Core.Common.ServiceModel;

namespace JobMtaani.Client.Proxies.Service_Proxies
{
    [Export(typeof(IAccountService))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class AccountClient : UserClientBase<IAccountService>, IAccountService
    {
        public Account GetCustomerAccountInfo(string loginEmail)
        {
            return Channel.GetCustomerAccountInfo(loginEmail);
        }

        public Task<Account> GetCustomerInfoAsync(string loginEmail)
        {
            return Channel.GetCustomerInfoAsync(loginEmail);
        }
    }
}
