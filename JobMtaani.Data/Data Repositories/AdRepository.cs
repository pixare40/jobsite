﻿using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobMtaani.Business.Common;

namespace JobMtaani.Data
{
    [Export(typeof(IAdRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class AdRepository : DataRepositoryBase<Ad>, IAdRepository
    {
        public Ad[] GetAdByCategory(int categoryId)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from a in entityContext.AdSet
                        where a.CategoryId == categoryId
                        select a).ToArray();
            }
        }

        public Ad[] GetApplyAds(string userId)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        where e.AccountId != userId
                        select e).ToArray();
            }
        }

        public Ad[] GetByLocation(string userId, string locationString)
        {
            using (JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                 where e.AdLocation == locationString where e.AccountId != userId
                 orderby e.DateCreated descending
                 select e).Take(7).ToArray<Ad>();
            }
        }

        public Ad[] GetPageAds(string userId, int pageNumber)
        {
            if(pageNumber == 0)
            {
                pageNumber = 1;
            }

            int pageSize = 10;
            int skip = (pageNumber * pageSize) - pageSize;

            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        where e.AccountId == userId
                        orderby e.DateCreated descending
                        select e).Skip(skip).Take(pageSize).ToArray();
            }
        }

        public int GetTotalUserAds(string userId)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return  (from e in entityContext.AdSet
                         where e.AccountId == userId
                         select e).Count();
            }
        }

        public Ad[] GetByLocation(string userId)
        {
            using (JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        where e.AccountId != userId
                        orderby e.DateCreated descending
                        select e).Take(7).ToArray<Ad>();
            }
        }

        public Ad[] GetByLocation()
        {
            using (JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        orderby e.DateCreated descending
                        select e).Take(7).ToArray<Ad>();
            }
        }

        public Ad[] GetBySearchTerms(SearchModel searchModel)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        where e.AdTitle.Contains(searchModel.JobType)
                        select e).ToArray();
            }
        }

        public Ad[] GetPersonalAds(string userId)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        where e.AccountId == userId
                        select e).ToArray();
            }
        }

        public Ad[] GetTopAds()
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.AdSet
                        orderby e.DateCreated descending
                        select e).Take(12).ToArray();
            }
        }

        protected override Ad AddEntity(JobMtaaniDbContext entityContext, Ad entity)
        {
            return entityContext.AdSet.Add(entity);
        }

        protected override IEnumerable<Ad> GetEntities(JobMtaaniDbContext entityContext)
        {
            return from e in entityContext.AdSet
                   select e;
        }

        protected override Ad GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.AdSet
                    where e.AdId == id
                    select e).FirstOrDefault();
        }

        protected override Ad UpdateEntity(JobMtaaniDbContext entityContext, Ad entity)
        {
            return (from e in entityContext.AdSet
                    where e.AdId == entity.AdId
                    select e).FirstOrDefault();
        }
    }
}
