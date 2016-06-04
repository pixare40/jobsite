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
    [Export(typeof(ICategoryRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class CategoryRepository : DataRepositoryBase<Category>, ICategoryRepository
    {
        protected override Category AddEntity(JobMtaaniDbContext entityContext, Category entity)
        {
            return entityContext.CategorySet.Add(entity);
        }

        protected override IEnumerable<Category> GetEntities(JobMtaaniDbContext entityContext)
        {
            return from e in entityContext.CategorySet
                   select e;
        }

        protected override Category GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.CategorySet
                   where e.CategoryId == id
                   select e).FirstOrDefault();
        }

        protected override Category UpdateEntity(JobMtaaniDbContext entityContext, Category entity)
        {
            return (from e in entityContext.CategorySet
                    where e.CategoryId == entity.CategoryId
                    select e).FirstOrDefault();
        }
    }
}
