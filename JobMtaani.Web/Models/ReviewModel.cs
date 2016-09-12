using JobMtaani.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobMtaani.Web.Models
{
    public class ReviewModel
    {
        public int TotalReviews { get; set; }
        public Review[] Reviews { get; set; }
    }
}