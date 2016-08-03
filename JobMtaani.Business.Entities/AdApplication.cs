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
    public class AdApplication : EntityBase, IIdentifiableEntity
    {
        [DataMember]
        public int AdApplicationId { get; set; }
        [DataMember]
        public int AdId { get; set; }
        [DataMember]
        public string AdApplicantId { get; set; }
        [DataMember]
        public DateTime? DateApplied { get; set; }
        [DataMember]
        public ApplicationStatus Status { get; set; }
        [DataMember]
        public DateTime? DateClosed { get; set; }
        public object EntityId
        {
            get
            {
                return AdApplicationId;
            }

            set
            {
                AdApplicationId = (int)value;
            }
        }
    }

    public enum ApplicationStatus
    {
        Accepted = 1,
        Denied = 2,
        Open = 3
    }
}
