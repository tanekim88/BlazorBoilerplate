

using System.Collections.Generic;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;
using Ardalis.Specification;



namespace Core.Domain.Interfaces
{
    public interface IRepository<T, TId> where T : Entity<TId>, IAggregateRoot
    {
        Task<T> GetByIdAsync(TId id, CancellationToken cancellationToken = default);
        Task<T> GetByIdAsync(object[] compositeKeys, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<T>> ListAllAsync(CancellationToken cancellationToken = default);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec, CancellationToken cancellationToken = default);

        Task<IReadOnlyList<TResult>> ListAsync<TResult>(ISpecification<T, TResult> spec,
            CancellationToken cancellationToken = default);

        Task AddAsync(T entity);
        Task AddRange(params T[] entities);
        void Update(T entity);
        void UpdateRange(T[] entities);
        void Remove(T entity);
        void RemoveRange(T[] entities);
        Task<int> DeleteAsync(ISpecification<T> spec, CancellationToken cancellationToken = default);
        Task DeleteByIdAsync(TId id, CancellationToken cancellationToken = default);
        Task DeleteByIdAsync(object[] compositeKeys, CancellationToken cancellationToken = default);
        Task<int> CountAsync(ISpecification<T> spec, CancellationToken cancellationToken = default);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        Task<T> FirstAsync(ISpecification<T> spec, CancellationToken cancellationToken = default);
        Task<T> FirstOrDefaultAsync(ISpecification<T> spec, CancellationToken cancellationToken = default);
        Task UseTransactionAsync(DbTransaction dbTransaction);
    }
}