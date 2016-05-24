using Core.Common.Contracts;
using Core.Common.Exceptions;
using JobMtaani.Client.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Contracts
{
    [ServiceContract]
    public interface IAdService : IServiceContract
    {
        [OperationContract]
        [FaultContract(typeof(NotFoundException))]
        Ad GetAd(int adId);

        [OperationContract]
        Ad[] GetOpenAdsByCategory(int categoryId);

        [OperationContract]
        Ad[] GetOpenAdsByCity(string city);

        [OperationContract]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        Ad CreateAd(Ad ad, string loginEmail);

        [OperationContract]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        void DeleteAd(int adId, string loginEmail);

        [OperationContract]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        Ad UpdateAd(Ad ad, string loginEmail);

        [OperationContract]
        Task<Ad> GetAdAsync(int adId);

        [OperationContract]
        Task<Ad[]> GetOpenAdsByCategoryAsync(int categoryId);

        [OperationContract]
        Task<Ad[]> GetOpenAdsByCityAsync(string city);

        [OperationContract]
        Task<Ad> CreateAdAsync(Ad ad, string logingEmail);

        [OperationContract]
        Task DeleteAdAsync(int adId, string loginEmail);

        [OperationContract]
        Task<Ad> UpdateAdAsync(Ad ad, string loginEmail);
    }
}
