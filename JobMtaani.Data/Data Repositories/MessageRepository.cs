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
    [Export(typeof(IMessageRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class MessageRepository : DataRepositoryBase<Message>, IMessageRepository
    {
        public IEnumerable<Message> GetReceivedMessages(string userId)
        {
            using (JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.MessageSet
                        where e.RecipientId == userId
                        select e);
            }
        }

        public IEnumerable<Message> GetSentMessages(string userId)
        {
            using(JobMtaaniDbContext entityContext = new JobMtaaniDbContext())
            {
                return (from e in entityContext.MessageSet
                        where e.SenderId == userId
                        select e);
            }
        }

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
