using Core.Common.Exceptions;
using JobMtaani.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Contracts
{
    [ServiceContract]
    public interface IAdService
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
    }
}
