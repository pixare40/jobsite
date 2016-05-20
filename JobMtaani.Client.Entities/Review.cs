using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Client.Entities
{
    public class Review
    {
        private int reviewId;
        private int accountId;
        private int reviewFor;
        private string reviewTitle;
        private string reviewText;
        private int rating;

        public int ReviewId
        {
            get
            {
                return reviewId;
            }

            set
            {
                reviewId = value;
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

        public int ReviewFor
        {
            get
            {
                return reviewFor;
            }

            set
            {
                reviewFor = value;
            }
        }

        public string ReviewTitle
        {
            get
            {
                return reviewTitle;
            }

            set
            {
                reviewTitle = value;
            }
        }

        public string ReviewText
        {
            get
            {
                return reviewText;
            }

            set
            {
                reviewText = value;
            }
        }

        public int Rating
        {
            get
            {
                return rating;
            }

            set
            {
                rating = value;
            }
        }
    }
}
