﻿using Core.Common.Contracts;
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
        [DataMember]
        public string CategoryCName { get; set; }
        [DataMember]
        public string IconClass { get; set; }
        public object EntityId
        {
            get
            {
                return CategoryId;
            }

            set
            {
                CategoryId = (int)value;
            }
        }
    }
}
