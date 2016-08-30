using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Common
{
    public class SearchModel
    {
        private string searchTerm;
        private string jobLocation;

        public string SearchTerm
        {
            get { return SearchTerm; }
            set { searchTerm = value; }
        }

        public string JobLocation
        {
            get { return jobLocation; }
            set { jobLocation = value; }
        }
        public SearchModel()
        {
        }

        public SearchModel(string searchTerm, string jobLocation)
        {
            this.searchTerm = searchTerm;
            this.jobLocation = jobLocation;
        }
    }
}
