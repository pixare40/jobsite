using Core.Common.Contracts;
using JobMtaani.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data.Contracts
{
    public interface IAdApplicationRepository : IDataRepository<AdApplication>
    {
        List<string> GetAdApplicant(int adId);
        AdApplication FindbyHireModel(string userName, int adId);
        List<AdApplication> FindUserAdApplications(string userId, int page);
        int GetTotalAdApplications(string userid);
        AdApplication[] GetAdApplicationsById(int adId);
    }
}
