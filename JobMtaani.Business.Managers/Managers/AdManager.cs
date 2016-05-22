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

namespace JobMtaani.Business.Managers
{
    public class AdManager : IAdService
    {
        [Import]
        IDataRepositoryFactory dataRepositoryFactory;

        public AdManager()
        {
            ObjectBase.Container.SatisfyImportsOnce(this);
        }

        public AdManager(IDataRepositoryFactory dataRepositoryFactory)
        {
            this.dataRepositoryFactory = dataRepositoryFactory;
        }

        public Ad CreateAd(Ad ad)
        {
            throw new NotImplementedException();
        }

        public Ad GetAd(int adId)
        {
            IAdRepository adRepository = dataRepositoryFactory.GetDataRepository<IAdRepository>();
            Ad ad =  adRepository.Get(adId);
            return ad;
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
