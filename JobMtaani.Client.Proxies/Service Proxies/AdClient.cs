using JobMtaani.Client.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Proxies
{
    [Export(typeof(IAdService))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class AdClient : ClientBase<IAdService>, IAdService
    {
        public Entities.Ad CreateAd(Entities.Ad ad, string loginEmail)
        {
            return Channel.CreateAd(ad, loginEmail);
        }

        public Task<Entities.Ad> CreateAdAsync(Entities.Ad ad, string loginEmail)
        {
            return Channel.CreateAdAsync(ad, loginEmail);
        }

        public void DeleteAd(int adId, string loginEmail)
        {
            Channel.DeleteAd(adId, loginEmail);
        }

        public Task DeleteAdAsync(int adId, string loginEmail)
        {
            return DeleteAdAsync(adId, loginEmail);
        }

        public Entities.Ad GetAd(int adId)
        {
            return Channel.GetAd(adId);
        }

        public Task<Entities.Ad> GetAdAsync(int adId)
        {
            return Channel.GetAdAsync(adId);
        }

        public Entities.Ad[] GetOpenAdsByCategory(int categoryId)
        {
            return Channel.GetOpenAdsByCategory(categoryId);
        }

        public Task<Entities.Ad[]> GetOpenAdsByCategoryAsync(int categoryId)
        {
            return Channel.GetOpenAdsByCategoryAsync(categoryId);
        }

        public Entities.Ad[] GetOpenAdsByCity(string city)
        {
            return Channel.GetOpenAdsByCity(city);
        }

        public Task<Entities.Ad[]> GetOpenAdsByCityAsync(string city)
        {
            return Channel.GetOpenAdsByCityAsync(city);
        }

        public Entities.Ad UpdateAd(Entities.Ad ad, string loginEmail)
        {
            return Channel.UpdateAd(ad, loginEmail);
        }

        public Task<Entities.Ad> UpdateAdAsync(Entities.Ad ad, string loginEmail)
        {
            return Channel.UpdateAdAsync(ad, loginEmail);
        }
    }
}
