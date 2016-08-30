using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data.Data_Repositories
{
    public class LocationRespository : DataRepositoryBase<Location>, ILocationRepository
    {
        protected override Location AddEntity(JobMtaaniDbContext entityContext, Location entity)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<Location> GetEntities(JobMtaaniDbContext entityContext)
        {
            throw new NotImplementedException();
        }

        protected override Location GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            throw new NotImplementedException();
        }

        protected override Location UpdateEntity(JobMtaaniDbContext entityContext, Location entity)
        {
            throw new NotImplementedException();
        }
    }
}
