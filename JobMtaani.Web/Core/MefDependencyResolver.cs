using System;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.Linq;
using System.Web.Mvc;
using Core.Common.Extensions;
using System.ComponentModel.Composition;

namespace JobMtaani.Web.Core
{
    public class MefDependencyResolver : IDependencyResolver
    {
        public MefDependencyResolver(CompositionContainer container)
        {
            _container = container;
        }

        CompositionContainer _container;

        public object GetService(Type serviceType)
        {
            //return _Container.GetExportedValueByType(serviceType);
            if (serviceType == null)
                throw new ArgumentNullException("serviceType");

            var name = AttributedModelServices.GetContractName(serviceType);
            var export = _container.GetExportedValueOrDefault<object>(name);
            return export;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            //return _container.GetExportedValuesByType(serviceType);
            if (serviceType == null)
                throw new ArgumentNullException("serviceType");

            var exports = _container.GetExportedValues<object>(AttributedModelServices.GetContractName(serviceType));
            return exports;
        }
    }
}
