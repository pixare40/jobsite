﻿using Core.Common.Contracts;
using JobMtaani.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data.Contracts
{
    public interface IMessageRepository : IDataRepository<Message>
    {
    }
}
