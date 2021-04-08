namespace Core.Domain.Interfaces
{
    public interface IBusinessRule
    {
        string Message { get; }
        bool IsBroken();
    }
}