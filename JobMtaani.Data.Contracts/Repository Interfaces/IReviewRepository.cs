using Core.Common.Contracts;
using JobMtaani.Business.Entities;

namespace JobMtaani.Data.Contracts
{
    public interface IReviewRepository : IDataRepository<Review>
    {
        Review[] GetUserReviews(string userId, int pageNumber);
        int GetTotalUserReviews(string userId);
    }
}
