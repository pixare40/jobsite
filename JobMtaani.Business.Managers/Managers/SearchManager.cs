using JobMtaani.Business.Common;
using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Managers
{
    [Export(typeof(ISearchManager))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class SearchManager : ISearchManager
    {
        private IAdRepository adRepository;
        private ILocationRepository locationRepository;
        private ICategoryRepository categoryRepository;

        [ImportingConstructor]
        public SearchManager(IAdRepository adRepository, ILocationRepository locationRepository, ICategoryRepository categoryRepository)
        {
            this.adRepository = adRepository;
            this.locationRepository = locationRepository;
            this.categoryRepository = categoryRepository;
        }

        public Ad[] Search(string searchTerm, int? locationId)
        {
            if(locationId == null)
            {
                locationId = 999;
            }

            Location location = locationRepository.Get(locationId.Value);
            SearchModel searchModel = new SearchModel(searchTerm, location != null?location.LocationCName: null);

            return adRepository.GetBySearchTerms(searchModel);
        }

        public Ad[] GetAllAdsPaged(int page)
        {
            Ad[] ads = adRepository.GetAllAdsPaged(page);

            foreach (var ad in ads)
            {
                ad.IconClass = categoryRepository.Get(ad.CategoryId).IconClass;
                ad.CategoryName = categoryRepository.Get(ad.CategoryId).CategoryCName;
            }

            return ads;
        }
    }

    public interface ISearchManager
    {
        Ad[] Search(string serchTerm, int? location);

        Ad[] GetAllAdsPaged(int page);
    }
}
