using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain.Mappers
{
    public class ModelToEntityMapperBase<TSource, TDest, TDestId> where TSource : class where TDest : Entity<TDestId> where TDestId : new()
    {
        public void Configure()
        {
   
        }
    }
}
