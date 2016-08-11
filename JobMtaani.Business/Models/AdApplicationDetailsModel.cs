using JobMtaani.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Models
{
    public class AdApplicationDetailsModel
    {
        public AdApplication AdApplication { get; set; }
        public Ad AdDetails { get; set; }
    }
}
