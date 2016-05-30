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
        private int fromAccountId;
        private int toAccountId;
        private string paymentType;
        private DateTime transactionDate;

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

        public int FromAccountId
        {
            get
            {
                return fromAccountId;
            }

            set
            {
                fromAccountId = value;
            }
        }

        public string PaymentType
        {
            get
            {
                return paymentType;
            }

            set
            {
                paymentType = value;
            }
        }

        public int ToAccountId
        {
            get
            {
                return toAccountId;
            }

            set
            {
                toAccountId = value;
            }
        }

        public DateTime TransactionDate
        {
            get
            {
                return transactionDate;
            }

            set
            {
                transactionDate = value;
            }
        }
    }
}
