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
    public class Ad : EntityBase, IAccountOwnedEntity, IIdentifiableEntity
    {
        [DataMember]
        public int AdId { get; set; }
        [DataMember]
        public int AccountId { get; set; }
        [DataMember]
        public int CategoryId { get; set; }
        [DataMember]
        public string AdLocation { get; set; }
        [DataMember]
        public List<Account> AdApplicants { get; set; }
        [DataMember]
        public string AdStatus { get; set; }
        public int EntityId
        {
            get
            {
                return AdId;
            }

            set
            {
                AdId = value;
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
