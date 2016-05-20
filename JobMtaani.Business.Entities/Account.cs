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
    public class Account : EntityBase, IIdentifiableEntity, IAccountOwnedEntity
    {
        public int AccountId { get; set; }
        [DataMember]
        public string LoginEmail { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Town { get; set; }

        [DataMember]
        public string County { get; set; }

        [DataMember]
        public int PhoneNumber { get; set; }

        public int EntityId
        {
            get { return AccountId; }

            set { AccountId = value; }
        }

        public int OwnerAccountId
        {
            get { return AccountId; }
        }
    }
}
