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
    [Export(typeof(IAdRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class AdRepository : DataRepositoryBase<Ad>, IAdRepository
    {
        protected override Ad AddEntity(JobMtaaniContext entityContext, Ad entity)
        {
            entityContext.Database.Connection.Open();
            return entityContext.AdSet.Add(entity);
        }

        protected override IEnumerable<Ad> GetEntities(JobMtaaniContext entityContext)
        {
            return from e in entityContext.AdSet
                   select e;
        }

        protected override Ad GetEntity(JobMtaaniContext entityContext, int id)
        {
            return (from e in entityContext.AdSet
                    where e.AdId == id
                    select e).FirstOrDefault();
        }

        protected override Ad UpdateEntity(JobMtaaniContext entityContext, Ad entity)
        {
            return (from e in entityContext.AdSet
                    where e.AdId == entity.AdId
                    select e).FirstOrDefault();
        }
    }
}
