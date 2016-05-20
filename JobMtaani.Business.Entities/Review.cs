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
        public int AccountId { get; set; }
        [DataMember]
        public int ReviewFor { get; set; }
        [DataMember]
        public string ReviewTitle { get; set; }
        [DataMember]
        public string ReviewText { get; set; }
        [DataMember]
        public int Rating { get; set; }
        public int EntityId
        {
            get
            {
                return ReviewId;
            }

            set
            {
                ReviewId = value;
            }
        }

        public int OwnerAccountId
        {
            get
            {
                return AccountId;
            }
        }
    }
}
