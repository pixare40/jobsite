using Core.Common.Contracts;
using Core.Common.Core;
using JobMtaani.Business.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System.ServiceModel;
using Core.Common.Exceptions;
using System.Security.Permissions;
using JobMtaani.Common;

namespace JobMtaani.Business.Managers
{
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall, 
        ConcurrencyMode = ConcurrencyMode.Multiple, ReleaseServiceInstanceOnTransactionComplete = false)]
    public class AdManager : ManagerBase, IAdService
    {
        [Import]
        IDataRepositoryFactory dataRepositoryFactory;

        public AdManager()
        {
        }

        public AdManager(IDataRepositoryFactory dataRepositoryFactory)
        {
            this.dataRepositoryFactory = dataRepositoryFactory;
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        //[PrincipalPermission(SecurityAction.Demand, Role = SecurityValueObject.JonMtaaniAdminRole)]
        //[PrincipalPermission(SecurityAction.Demand, Name = SecurityValueObject.JonMtaaniUser)]
        public Ad CreateAd(Ad ad, string loginEmail)
        {
            return ExecuteFaultHandledOperation(() =>
            {
                IAdRepository adRepository = dataRepositoryFactory.GetDataRepository<IAdRepository>();
                Ad newad = adRepository.Add(ad);
                return newad;
            });
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        //[PrincipalPermission(SecurityAction.Demand, Role = SecurityValueObject.JonMtaaniAdminRole)]
        //[PrincipalPermission(SecurityAction.Demand, Name = SecurityValueObject.JonMtaaniUser)]
        public void DeleteAd(int adId, string loginEmail)
        {
            ExecuteFaultHandledOperation(() =>
            {
                IAdRepository adRepository = dataRepositoryFactory.GetDataRepository<IAdRepository>();
                IAccountRepository accountRepository = dataRepositoryFactory.GetDataRepository<IAccountRepository>();

                Account authAccount = accountRepository.GetByLogin(loginEmail);
                ValidateAuthorization(authAccount);

                adRepository.Remove(adId);
            });
        }

        [OperationBehavior(TransactionScopeRequired =true)]
        //[PrincipalPermission(SecurityAction.Demand, Role = SecurityValueObject.JonMtaaniAdminRole)]
        //[PrincipalPermission(SecurityAction.Demand, Name = SecurityValueObject.JonMtaaniUser)]
        public Ad UpdateAd(Ad ad, string loginEmail)
        {
            return ExecuteFaultHandledOperation(() =>
            {
                IAdRepository adrepository = dataRepositoryFactory.GetDataRepository<IAdRepository>();

                Ad updatedEntity = null;

                if(ad.AdId == 0)
                {
                   updatedEntity  = adrepository.Add(ad);
                }
                else
                {
                    updatedEntity = adrepository.Update(ad);
                }
                return updatedEntity;
            });
        }

        //[PrincipalPermission(SecurityAction.Demand, Role = SecurityValueObject.JonMtaaniAdminRole)]
        //[PrincipalPermission(SecurityAction.Demand, Name = SecurityValueObject.JonMtaaniUser)]
        public Ad GetAd(int adId)
        {
            return ExecuteFaultHandledOperation(() =>
            {
                IAdRepository adRepository = dataRepositoryFactory.GetDataRepository<IAdRepository>();
                Ad ad = adRepository.Get(adId);
                if(ad == null)
                {
                    NotFoundException ex = new NotFoundException(string.Format("Ad with ID of {0} is not in database", adId));
                    throw new FaultException<NotFoundException>(ex, ex.Message);
                }

                return ad;
            });
        }

        //[PrincipalPermission(SecurityAction.Demand, Role = SecurityValueObject.JonMtaaniAdminRole)]
        //[PrincipalPermission(SecurityAction.Demand, Name = SecurityValueObject.JonMtaaniUser)]
        public Ad[] GetOpenAdsByCategory(int categoryId)
        {
            throw new NotImplementedException();
        }

        //[PrincipalPermission(SecurityAction.Demand, Role = SecurityValueObject.JonMtaaniAdminRole)]
        //[PrincipalPermission(SecurityAction.Demand, Name = SecurityValueObject.JonMtaaniUser)]
        public Ad[] GetOpenAdsByCity(string city)
        {
            throw new NotImplementedException();
        }

        protected override Account LoadAuthorizationValidationAccount(string loginName)
        {
            IAccountRepository accountRepository = dataRepositoryFactory.GetDataRepository<IAccountRepository>();
            Account authAccount = accountRepository.GetByLogin(loginName);
            if (authAccount == null)
            {
                NotFoundException ex =  new NotFoundException(string.Format("Cannot find account for login name {0} to use for security", loginName));
                throw new FaultException<NotFoundException>(ex, ex.Message);
            }
            return authAccount;
        }
    }
}
