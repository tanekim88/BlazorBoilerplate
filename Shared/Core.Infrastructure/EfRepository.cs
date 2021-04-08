

using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Core.Domain;
using Core.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;



namespace Core.Infrastructure
{
    public class EfRepository<T, TId, TDbContext> : IRepository<T, TId>
        where T : Entity<TId>, IAggregateRoot
        where TDbContext: DbContext
    {
        protected readonly TDbContext _context;

        public EfRepository(IDbContextFactory<TDbContext> contextFactory)
        {
            _context = contextFactory.CreateDbContext();
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity: entity);
        }

        public async Task AddRange(params T[] entities)
        {
            await _context.Set<T>().AddRangeAsync(entities: entities);
        }

        public async Task<int> CountAsync(ISpecification<T> spec, CancellationToken cancellationToken = default)
        {
            var specificationResult = ApplySpecification(spec: spec);
            return await specificationResult.CountAsync(cancellationToken: cancellationToken);
        }

        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity: entity);
        }

        public async Task<int> DeleteAsync(ISpecification<T> spec, CancellationToken cancellationToken = default)
        {
            var specificationResult = ApplySpecification(spec: spec);
            var toReturn = await specificationResult.DeleteAsync(cancellationToken: cancellationToken);
            return toReturn;
        }

        public async Task DeleteByIdAsync(TId id, CancellationToken cancellationToken = default)
        {
            var keyValues = new object[] {id};
            await _context.Set<T>().DeleteByKeyAsync(cancellationToken: cancellationToken, keyValues: keyValues);
        }

        public async Task DeleteByIdAsync(object[] compositeKeys, CancellationToken cancellationToken = default)
        {
            await _context.Set<T>().DeleteByKeyAsync(cancellationToken: cancellationToken, keyValues: compositeKeys);
        }


        public void RemoveRange(params T[] entities)
        {
            _context.Set<T>().RemoveRange(entities: entities);
        }

        public async Task<T> FirstAsync(ISpecification<T> spec, CancellationToken cancellationToken = default)
        {
            var specificationResult = ApplySpecification(spec: spec);
            return await specificationResult.FirstAsync(cancellationToken: cancellationToken);
        }

        public async Task<T> FirstOrDefaultAsync(ISpecification<T> spec, CancellationToken cancellationToken = default)
        {
            var specificationResult = ApplySpecification(spec: spec);
            return await specificationResult.FirstOrDefaultAsync(cancellationToken: cancellationToken);
        }

        public async Task<T> GetByIdAsync(TId id, CancellationToken cancellationToken = default)
        {
            var keyValues = new object[] {id};
            return await _context.Set<T>().FindAsync(keyValues: keyValues, cancellationToken: cancellationToken);
        }

        public async Task<T> GetByIdAsync(object[] ids, CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().FindAsync(keyValues: ids, cancellationToken: cancellationToken);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().ToListAsync(cancellationToken: cancellationToken);
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec,
            CancellationToken cancellationToken = default)
        {
            var specificationResult = ApplySpecification(spec: spec);
            var toReturn = await specificationResult.ToListAsync(cancellationToken: cancellationToken);

            return toReturn;
        }

        public async Task<IReadOnlyList<TResult>> ListAsync<TResult>(ISpecification<T, TResult> spec,
            CancellationToken cancellationToken = default)
        {
            var specificationResult = ApplySpecification(spec: spec);
            var toReturn = await specificationResult.ToListAsync(cancellationToken: cancellationToken);

            return toReturn;
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity: entity);
        }

        public void UpdateRange(params T[] entities)
        {
            _context.Set<T>().UpdateRange(entities: entities);
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var toReturn = await _context.SaveChangesAsync(cancellationToken: cancellationToken);
            return toReturn;
        }

        public async Task UseTransactionAsync(DbTransaction dbTransaction)
        {
            await _context.Database.UseTransactionAsync(transaction: dbTransaction);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            var toReturn = await _context.Database.BeginTransactionAsync();
            return toReturn;
        }

        public async ValueTask DisposeAsync()
        {
            await _context.DisposeAsync();
        }


        private IQueryable<TResult> ApplySpecification<TResult>(ISpecification<T, TResult> spec)
        {
            var evaluator = new SpecificationEvaluator();
            return evaluator.GetQuery(query: _context.Set<T>().AsQueryable(), specification: spec);
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            var evaluator = new SpecificationEvaluator();
            return evaluator.GetQuery(query: _context.Set<T>().AsQueryable(), specification: spec);
        }
    }
}