using JobMtaani.Business.Entities;
using JobMtaani.Data.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Managers
{
    [Export(typeof(ISearchManager))]
    [PartCreationPolicy(CreationPolicy.NonShared)]
    public class SearchManager : ISearchManager
    {
        private IAdRepository adRepository;
        public Ad[] Search(string serchTerm, string location)
        {
            throw new NotImplementedException();
        }
    }

    public interface ISearchManager
    {
        Ad[] Search(string serchTerm, string location);
    }
}
