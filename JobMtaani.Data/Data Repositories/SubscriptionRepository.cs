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
    [Export(typeof(ISubscriptionRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class SubscriptionRepository : DataRepositoryBase<Subscription>, ISubscriptionRepository
    {
        protected override Subscription AddEntity(JobMtaaniDbContext entityContext, Subscription entity)
        {
            return entityContext.SubscriptionSet.Add(entity);

        }

        protected override IEnumerable<Subscription> GetEntities(JobMtaaniDbContext entityContext)
        {
            return from e in entityContext.SubscriptionSet
                   select e;
        }

        protected override Subscription GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.SubscriptionSet
                   where e.SubscriptionId == id
                   select e).FirstOrDefault();
        }

        protected override Subscription UpdateEntity(JobMtaaniDbContext entityContext, Subscription entity)
        {
            return (from e in entityContext.SubscriptionSet
                    where e.SubscriptionId == entity.SubscriptionId
                    select e).FirstOrDefault();
        }
    }
}
