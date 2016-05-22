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
        public Ad CreateAd(Ad ad)
        {
            throw new NotImplementedException();
        }

        [OperationBehavior(TransactionScopeRequired = true)]
        public void DeleteAd(int adId)
        {
            ExecuteFaultHandledOperation(() =>
            {
                IAdRepository adRepository = dataRepositoryFactory.GetDataRepository<IAdRepository>();

                adRepository.Remove(adId);
            });
        }

        [OperationBehavior(TransactionScopeRequired =true)]
        public Ad UpdateAd(Ad ad)
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

        public Ad[] GetOpenAdsByCategory(int categoryId)
        {
            throw new NotImplementedException();
        }

        public Ad[] GetOpenAdsByCity(string city)
        {
            throw new NotImplementedException();
        }
    }
}
