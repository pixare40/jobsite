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
    public class Review : EntityBase, IAccountOwnedEntity, IIdentifiableEntity
    {
        [DataMember]
        public int ReviewId { get; set; }
        [DataMember]
        public string AccountId { get; set; }
        [DataMember]
        public string ReviewFor { get; set; }
        [DataMember]
        public string ReviewTitle { get; set; }
        [DataMember]
        public string ReviewText { get; set; }
        [DataMember]
        public DateTime DateCreated { get; set; }
        [DataMember]
        public int Rating { get; set; }
        public object EntityId
        {
            get
            {
                return ReviewId;
            }

            set
            {
                ReviewId = (int)value;
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
