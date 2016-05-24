using JobMtaani.Business.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using Core.Common.Exceptions;
using System.ComponentModel.Composition;
using Core.Common.Contracts;

namespace JobMtaani.Business.Managers.Managers
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall,
        ConcurrencyMode = ConcurrencyMode.Multiple)]
    public class AccountManager : ManagerBase, IAccountService
    {
        [Import]
        IDataRepositoryFactory dataRepositoryFactory;

        public AccountManager()
        {

        }

        public AccountManager(IDataRepositoryFactory dataRepository)
        {
            this.dataRepositoryFactory = dataRepository;
        }
        public Account GetCustomerAccountInfo(string loginEmail)
        {
            return ExecuteFaultHandledOperation(() =>
            {
                IAccountRepository accountRepository = dataRepositoryFactory.GetDataRepository<IAccountRepository>();

                Account acc = accountRepository.GetByLogin(loginEmail);

                if(acc == null)
                {
                    NotFoundException ex = new NotFoundException(string.Format("Customer with login {0} wasn't found", loginEmail));
                    throw new FaultException<NotFoundException>(ex, ex.Message);
                }

                ValidateAuthorization(acc);

                return acc;
            });
        }

        protected override Account LoadAuthorizationValidationAccount(string loginName)
        {
            IAccountRepository accountRepository = dataRepositoryFactory.GetDataRepository<IAccountRepository>();
            Account authAccount = accountRepository.GetByLogin(loginName);
            if (authAccount == null)
            {
                NotFoundException ex = new NotFoundException(string.Format("Cannot find account for login name {0} to use for security", loginName));
                throw new FaultException<NotFoundException>(ex, ex.Message);
            }
            return authAccount;
        }
    }
}
