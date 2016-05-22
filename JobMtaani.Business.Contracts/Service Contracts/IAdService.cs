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
        Ad GetAd(int adId);

        [OperationContract]
        Ad[] GetOpenAdsByCategory(int categoryId);

        [OperationContract]
        Ad[] GetOpenAdsByCity(string city);

        [OperationContract]
        Ad CreateAd(Ad ad);
    }
}
