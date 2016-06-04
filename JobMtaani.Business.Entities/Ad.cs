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
    public class Ad : EntityBase, IAccountOwnedEntity, IIdentifiableEntity
    {
        public int AdId { get; set; }
        public string AccountId { get; set; }
        public int CategoryId { get; set; }
        public string AdLocation { get; set; }
        public int[] AdApplicants { get; set; }
        public bool AdClosed { get; set; }
        public string AdDescription { get; set; }
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
