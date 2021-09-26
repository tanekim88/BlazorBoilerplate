using System;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Infrastructure.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync(
            CancellationToken cancellationToken = default,
            Guid? internalCommandId = null);
    }
}