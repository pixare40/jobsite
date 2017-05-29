using Core.Common.Contracts;
using Core.Common.Core;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Entities
{
    [DataContract]
    public class Account : IdentityUser, IIdentifiableEntity, IAccountOwnedEntity
    {
        [DataMember]
        public decimal AccountBalance { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public bool SubscriptionStatus { get; set; }
        [DataMember]
        public DateTime? SubscriptionExpiry { get; set; }
        [DataMember]
        public DateTime DateJoined { get; set; }
        [DataMember]
        public string Location { get; set; }
        [DataMember]
        public int NumberOfReviews { get; set; }
        [DataMember]
        public int CurrentRating { get; set; }
        [DataMember]
        public int IDCardNumber { get; set; }
        [DataMember]
        public string CompanyName { get; set; }
        [DataMember]
        public string Role { get; set; }

        public object EntityId
        {
            get
            {
                return Id;
            }

            set
            {
                Id = (string)value;
            }
        }

        public string OwnerAccountId
        {
            get
            {
                return Id;
            }
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<Account> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}
