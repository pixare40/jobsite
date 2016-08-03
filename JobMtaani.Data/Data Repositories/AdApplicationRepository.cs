using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data
{
    [Export(typeof(IAdApplicationRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class AdApplicationRepository : DataRepositoryBase<AdApplication>, IAdApplicationRepository
    {
        public AdApplication FindbyHireModel(string userName, int adId)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdApplicationSet
                        where e.AdApplicantId == userName && e.AdId == adId
                        select e).FirstOrDefault();
            }
        }

        public List<string> GetAdApplicant(int adId)
        {
            using (JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdApplicationSet
                        where e.AdId == adId
                        select e.AdApplicantId).ToList();
            }
        }

        protected override AdApplication AddEntity(JobMtaaniDbContext entityContext, AdApplication entity)
        {
            return entityContext.AdApplicationSet.Add(entity);
        }

        protected override IEnumerable<AdApplication> GetEntities(JobMtaaniDbContext entityContext)
        {
            return from e in entityContext.AdApplicationSet
                   select e;
        }

        protected override AdApplication GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.AdApplicationSet
                   where e.AdApplicationId == id
                   select e).FirstOrDefault();
        }

        protected override AdApplication UpdateEntity(JobMtaaniDbContext entityContext, AdApplication entity)
        {
            return (from e in entityContext.AdApplicationSet
                    where e.AdApplicationId == entity.AdApplicationId
                    select e).FirstOrDefault();
        }
    }
}
