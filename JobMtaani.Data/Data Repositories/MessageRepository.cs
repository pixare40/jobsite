using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data.Data_Repositories
{
    public class MessageRepository : DataRepositoryBase<Message>, IMessageRepository
    {
        protected override Message AddEntity(JobMtaaniDbContext entityContext, Message entity)
        {
            return entityContext.MessageSet.Add(entity);
        }

        protected override IEnumerable<Message> GetEntities(JobMtaaniDbContext entityContext)
        {
            return (from e in entityContext.MessageSet
                    select e);
        }

        protected override Message GetEntity(JobMtaaniDbContext entityContext, int id)
        {
            return (from e in entityContext.MessageSet
                    where e.MessageId == id
                    select e).FirstOrDefault();
        }

        protected override Message UpdateEntity(JobMtaaniDbContext entityContext, Message entity)
        {
            return (from e in entityContext.MessageSet
                    where e.MessageId == entity.MessageId
                    select e).FirstOrDefault();
        }
    }
}
