﻿using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data
{
    [Export(typeof(IReviewRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class ReviewRepository : DataRepositoryBase<Review>, IReviewRepository
    {
        protected override Review AddEntity(JobMtaaniDbContext entityContext, Review entity)
        {
            return entityContext.ReviewSet.Add(entity);
        }

        protected override IEnumerable<Review> GetEntities(JobMtaaniDbContext entityContext)
        {
            return from e in entityContext.ReviewSet
                   select e;
        }

        protected override Review GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.ReviewSet
                    where e.ReviewId == id
                    select e).FirstOrDefault();
        }
        protected override Review UpdateEntity(JobMtaaniDbContext entityContext, Review entity)
        {
            return (from e in entityContext.ReviewSet
                    where e.ReviewId == entity.ReviewId
                    select e).FirstOrDefault();
        }
    }
}
