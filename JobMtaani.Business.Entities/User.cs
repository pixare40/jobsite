using Core.Common.Contracts;
using Core.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Entities
{
    public class User : EntityBase, IIdentifiableEntity
    {
        public int UserId { get; set; }
        public int EntityId
        {
            get { return UserId; }

            set { UserId = value; }
        }
    }
}
