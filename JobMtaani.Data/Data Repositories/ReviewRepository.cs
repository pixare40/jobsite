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
    [Export(typeof(IReviewRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class ReviewRepository : DataRepositoryBase<Review>, IReviewRepository
    {
        protected override Review AddEntity(JobMtaaniContext entityContext, Review entity)
        {
            return entityContext.ReviewSet.Add(entity);
        }

        protected override IEnumerable<Review> GetEntities(JobMtaaniContext entityContext)
        {
            throw new NotImplementedException();
        }

        protected override Review GetEntity(JobMtaaniContext entityContext, int id)
        {
            throw new NotImplementedException();
        }

        protected override Review UpdateEntity(JobMtaaniContext entityContext, Review entity)
        {
            throw new NotImplementedException();
        }
    }
}
