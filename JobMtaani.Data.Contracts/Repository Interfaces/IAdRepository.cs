using Core.Common.Contracts;
using JobMtaani.Business.Common;
using JobMtaani.Business.Entities;

namespace JobMtaani.Data.Contracts
{
    public interface IAdRepository : IDataRepository<Ad>
    {
        Ad[] GetAdByCategory(int categoryId);
        Ad[] GetByLocation(string userId, string locationString);
        Ad[] GetByLocation();
        Ad[] GetByLocation(string userId);
        Ad[] GetBySearchTerms(SearchModel searchModel);
        Ad[] GetTopAds();
        Ad[] GetPersonalAds(string userId);
        Ad[] GetApplyAds(string userId);
    }
}
