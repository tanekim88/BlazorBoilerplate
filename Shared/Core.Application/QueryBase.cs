

using System;
using MediatR;



namespace Core.Application
{
    public class QueryBase<T> : IRequest<T>
    {
        public Guid Id { get; set; }
        public DateTime? ProcessedDate { get; set; }
    }
}