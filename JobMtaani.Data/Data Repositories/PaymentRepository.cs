﻿using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts.Repository_Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data
{
    [Export(typeof(IPaymentRepository))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class PaymentRepository : DataRepositoryBase<Payment>, IPaymentRepository
    {
        protected override Payment AddEntity(JobMtaaniContext entityContext, Payment entity)
        {
            return entityContext.PaymentSet.Add(entity);
        }

        protected override IEnumerable<Payment> GetEntities(JobMtaaniContext entityContext)
        {
            return from e in entityContext.PaymentSet
                   select e;
        }

        protected override Payment GetEntity(JobMtaaniContext entityContext, int id)
        {
            return (from e in entityContext.PaymentSet
                    where e.PaymentId == id
                    select e).FirstOrDefault();
        }

        protected override Payment UpdateEntity(JobMtaaniContext entityContext, Payment entity)
        {
            return (from e in entityContext.PaymentSet
                    where e.PaymentId == entity.PaymentId
                    select e).FirstOrDefault();
        }
    }
}
