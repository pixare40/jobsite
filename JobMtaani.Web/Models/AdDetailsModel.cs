using JobMtaani.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobMtaani.Web.Models
{
    public class AdDetailsModel
    {
        public Ad AdDetails { get; set; }
        public List<UserAccountModel> AdApplicantDetails { get; set; }

        public AdDetailsModel()
        {
            AdDetails = new Ad();
            AdApplicantDetails = new List<UserAccountModel>();
        }
    }

    public class NewsFeedModel
    {
        public Ad AdDetails { get; set; }
        public AdApplication AdApplication { get; set; }
    }
}