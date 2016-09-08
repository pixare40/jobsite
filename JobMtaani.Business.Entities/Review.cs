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
    public class Review : EntityBase, IAccountOwnedEntity, IIdentifiableEntity
    {
        public int ReviewId { get; set; }
        public string AccountId { get; set; }
        public string ReviewFor { get; set; }
        public string ReviewTitle { get; set; }
        public string ReviewText { get; set; }
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
