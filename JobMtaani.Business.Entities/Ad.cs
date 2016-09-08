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
        public string AccountId { get; set; }
        [DataMember]
        public int CategoryId { get; set; }
        [DataMember]
        public string AdLocation { get; set; }
        [DataMember]
        public string AdTitle { get; set; }
        [DataMember]
        public List<string> AdApplicants { get; set; }
        [DataMember]
        public bool AdClosed { get; set; }
        [DataMember]
        public string AdDescription { get; set; }
        [DataMember]
        public DateTime DateCreated { get; set; }
        [DataMember]
        public string IconClass { get; set; }
        [DataMember]
        public string CategoryName { get; set; }
        [DataMember]
        public decimal ApproximateWage { get; set; }
        [DataMember]
        public bool AdApplied { get; set; }
        
        public object EntityId
        {
            get
            {
                return AdId;
            }

            set
            {
                AdId = (int)value;
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
