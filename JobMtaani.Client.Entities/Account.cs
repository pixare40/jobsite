using Core.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Entities
{
    public class Account : ObjectBase
    {
        private int accountId;
        private string loginEmail;
        private string firstName;
        private string lastName;
        private string town;
        private string county;
        private string phoneNumber;

        public string PhoneNumber
        {
            get
            {
                return phoneNumber;
            }

            set
            {
                phoneNumber = value;
            }
        }

        public string County
        {
            get
            {
                return county;
            }

            set
            {
                county = value;
            }
        }

        public string Town
        {
            get
            {
                return town;
            }

            set
            {
                town = value;
            }
        }

        public string LastName
        {
            get
            {
                return lastName;
            }

            set
            {
                lastName = value;
            }
        }

        public string FirstName
        {
            get
            {
                return firstName;
            }

            set
            {
                firstName = value;
            }
        }

        public string LoginEmail
        {
            get
            {
                return loginEmail;
            }

            set
            {
                loginEmail = value;
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
    }
}
