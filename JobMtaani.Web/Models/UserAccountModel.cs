using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobMtaani.Web.Models
{
    public class UserAccountModel
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Location { get; set; }
        public int IDCardNumber { get; set; }
        public DateTime DateJoined { get; set; }
        public bool SubscriptionStatus { get; set; }
        public int CurrentRating { get; set; }
        public int NumberOfReviews { get; set; }
    }
}