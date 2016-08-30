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
    public class Location : EntityBase, IIdentifiableEntity
    {
        [DataMember]
        public int LocationId { get; set; }
        [DataMember]
        public string LocationCName { get; set; }
        [DataMember]
        public string LocationName { get; set; }
        public object EntityId
        {
            get
            {
                return LocationId;
            }

            set
            {
                LocationId = (int)value;
            }
        }
    }
}
