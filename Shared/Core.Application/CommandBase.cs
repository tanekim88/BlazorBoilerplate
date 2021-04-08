

using System;



namespace Core.Application
{
    public class CommandBase
    {
        public Guid Id { get; set; }
        public DateTime? ProcessedDate { get; set; }
    }
}