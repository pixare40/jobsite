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
    public class Subscription : EntityBase, IAccountOwnedEntity, IIdentifiableEntity
    {
        [DataMember]
        public int SubscriptionId { get; set; }
        [DataMember]
        public string SubscriptionPaymentId { get; set; }
        [DataMember]
        public string AccountId { get; set; }
        [DataMember]
        public DateTime TransactionDate { get; set; }
        [DataMember]
        public string PaymentStatus { get; set; }
        public object EntityId
        {
            get
            {
                return SubscriptionId;
            }

            set
            {
                SubscriptionId = (int)value;
            }
        }

        public string OwnerAccountId
        {
            get
            {
                return AccountId;
            }
        }
    }
}
