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
    public class Message : EntityBase, IAccountOwnedEntity, IIdentifiableEntity
    {
        [DataMember]
        public int MessageId { get; set; }
        [DataMember]
        public string MessageTitle { get; set; }
        [DataMember]
        public string MessageBody { get; set; }
        [DataMember]
        public string SenderId { get; set; }
        [DataMember]
        public string RecipientId { get; set; }
        
        public object EntityId
        {
            get
            {
                return MessageId;
            }

            set
            {
                MessageId = (int)value;
            }
        }

        public string OwnerAccountId
        {
            get
            {
                return SenderId;
            }
        }
    }
}
