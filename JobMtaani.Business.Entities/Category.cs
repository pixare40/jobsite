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
    public class Category : EntityBase, IIdentifiableEntity
    {
        [DataMember]
        public int CategoryId { get; set; }
        [DataMember]
        public string CategoryName { get; set; }
        public int EntityId
        {
            get
            {
                return CategoryId;
            }

            set
            {
                CategoryId = value;
            }
        }
    }
}
