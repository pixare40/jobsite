﻿using JobMtaani.Business.Common;
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

        [ImportingConstructor]
        public SearchManager(IAdRepository adRepository, ILocationRepository locationRepository)
        {
            this.adRepository = adRepository;
            this.locationRepository = locationRepository;
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
    }

    public interface ISearchManager
    {
        Ad[] Search(string serchTerm, int? location);
    }
}