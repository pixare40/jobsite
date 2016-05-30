using Core.Common.Contracts;
using Core.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Entities
{
    [DataContract]
    public class Payment : EntityBase, IIdentifiableEntity, IAccountOwnedEntity
    {
        [DataMember]
        public int PaymentId { get; set; }
        [DataMember]
        public decimal PaymentAmount { get; set; }
        [DataMember]
        public int FromAccountId { get; set; }
        [DataMember]
        public int ToAccountId { get; set; }
        [DataMember]
        public DateTime TransactionDate { get; set; }
        public int EntityId
        {
            get
            {
                return PaymentId;
            }

            set
            {
                PaymentId = value;
            }
        }

        public int OwnerAccountId
        {
            get
            {
                return FromAccountId;
            }
        }
    }
}
