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
        public DateTime DateApplied { get; set; }
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
}
