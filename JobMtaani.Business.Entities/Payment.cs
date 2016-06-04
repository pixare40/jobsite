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
        public string FromAccountId { get; set; }
        [DataMember]
        public string ToAccountId { get; set; }
        [DataMember]
        public DateTime TransactionDate { get; set; }
        public object EntityId
        {
            get
            {
                return PaymentId;
            }

            set
            {
                PaymentId = (int)value;
            }
        }

        public string OwnerAccountId
        {
            get
            {
                return FromAccountId;
            }
        }
    }
}
