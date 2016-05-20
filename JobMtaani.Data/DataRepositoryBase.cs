using System;
using System.Collections.Generic;
using System.Linq;
using Core.Common.Contracts;
using Core.Common.Data;

namespace JobMtaani.Data
{
    public abstract class DataRepositoryBase<T> : DataRepositoryBase<T, JobMtaaniContext>
        where T : class, IIdentifiableEntity, new()
    {
    }
}
