using Core.Common.Contracts;
using JobMtaani.Business.Entities;

namespace JobMtaani.Data.Contracts
{
    public interface IAccountRepository : IDataRepository<Account>
    {
        Account GetByLogin(string login);
    }
}
