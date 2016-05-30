using Core.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Entities
{
    public class Ad : ObjectBase
    {
        private int adId;
        private int accountId;
        private List<Account> adApplicants;
        private int categoryId;
        private string adLocation;
        private bool adClosed;
        private bool adDescription;

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
                OnPropertyChanged(() => AdApplicants);
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
                OnPropertyChanged(() => CategoryId);
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
                OnPropertyChanged(() => AdLocation);
            }
        }

        public bool AdClosed
        {
            get
            {
                return adClosed;
            }

            set
            {
                adClosed = value;
                OnPropertyChanged(() => AdClosed);
            }
        }

        public bool AdDescription
        {
            get
            {
                return adDescription;
            }

            set
            {
                adDescription = value;
            }
        }
    }
}
