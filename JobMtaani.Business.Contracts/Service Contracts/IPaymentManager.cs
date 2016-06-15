using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Contracts
{
    public interface IPaymentManager
    {
        string GetPesapalUrl(string userId);
    }
}
