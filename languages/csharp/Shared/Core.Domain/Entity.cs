

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Domain.Exceptions;
using Core.Domain.Interfaces;



namespace Core.Domain
{
    public abstract class Entity<TId>
    {
        [Required]
        public virtual TId Id { get; protected set; }

        private List<IDomainEvent> _domainEvents = new List<IDomainEvent>();

        /// <summary>
        ///     Core.Domain events occurred.
        /// </summary>
        public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

        public void ClearDomainEvents()
        {
            _domainEvents?.Clear();
        }

        /// <summary>
        ///     Add domain event.
        /// </summary>
        /// <param name="domainEvent">Core.Domain event.</param>
        protected void AddDomainEvent(IDomainEvent domainEvent)
        {
            _domainEvents.Add(item: domainEvent);
        }

        protected void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken()) throw new BusinessRuleValidationException(brokenRule: rule);
        }
    }
}