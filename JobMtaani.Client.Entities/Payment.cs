using Core.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Entities
{
    public class Payment : ObjectBase
    {
        private int paymentId;
        private decimal paymentAmount;
        private int accountId;

        public int PaymentId
        {
            get
            {
                return paymentId;
            }

            set
            {
                paymentId = value;
            }
        }

        public decimal PaymentAmount
        {
            get
            {
                return paymentAmount;
            }

            set
            {
                paymentAmount = value;
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
