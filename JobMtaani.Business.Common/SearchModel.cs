using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Common
{
    public class SearchModel
    {
        private string jobType;
        private string jobLocation;

        public string JobType
        {
            get { return JobType; }
            set { jobType = value; }
        }

        public string JobLocation
        {
            get { return jobLocation; }
            set { jobLocation = value; }
        }
        public SearchModel()
        {
        }

        public SearchModel(string jobtype, string jobLocation)
        {
            this.jobType = jobtype;
            this.jobLocation = jobLocation;
        }
    }
}
