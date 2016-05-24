using JobMtaani.Business.Managers;
using JobMtaani.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Business.Bootstrapper
{
    public static class MEFLoader
    {
        public static CompositionContainer Init()
        {
            AggregateCatalog catalog = new AggregateCatalog();

            //Create Catalog
            catalog.Catalogs.Add(new AssemblyCatalog(typeof(AccountRepository).Assembly));
            catalog.Catalogs.Add(new AssemblyCatalog(typeof(AdManager).Assembly));

            CompositionContainer container = new CompositionContainer(catalog);

            return container;
        }
    }
}
