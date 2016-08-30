using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data.Data_Repositories
{
    [Export(typeof(ILocationRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class LocationRespository : DataRepositoryBase<Location>, ILocationRepository
    {
        protected override Location AddEntity(JobMtaaniDbContext entityContext, Location entity)
        {
            return entityContext.LocationSet.Add(entity);
        }

        protected override IEnumerable<Location> GetEntities(JobMtaaniDbContext entityContext)
        {
            return entityContext.LocationSet.ToArray();

        }

        protected override Location GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.LocationSet
                    where e.LocationId == id
                    select e).FirstOrDefault();
        }

        protected override Location UpdateEntity(JobMtaaniDbContext entityContext, Location entity)
        {
            return (from e in entityContext.LocationSet
                    where e.LocationId == entity.LocationId
                    select e).FirstOrDefault();
        }
    }
}
