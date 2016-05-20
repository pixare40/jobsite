using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Entities
{
    public class Ad
    {
        private int adId;
        private int accountId;
        private List<Account> adApplicants;
        private int categoryId;
        private string adLocation;
        private string adStatus;

        public int AdId
        {
            get
            {
                return adId;
            }

            set
            {
                adId = value;
            }
        }

        public int AccountId
        {
            get
            {
                return accountId;
            }

            set
            {
                accountId = value;
            }
        }

        public List<Account> AdApplicants
        {
            get
            {
                return adApplicants;
            }

            set
            {
                adApplicants = value;
            }
        }

        public int CategoryId
        {
            get
            {
                return categoryId;
            }

            set
            {
                categoryId = value;
            }
        }

        public string AdLocation
        {
            get
            {
                return adLocation;
            }

            set
            {
                adLocation = value;
            }
        }

        public string AdStatus
        {
            get
            {
                return adStatus;
            }

            set
            {
                adStatus = value;
            }
        }
    }
}
