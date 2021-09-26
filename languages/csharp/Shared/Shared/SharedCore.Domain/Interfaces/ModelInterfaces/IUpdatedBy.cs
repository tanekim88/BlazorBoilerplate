namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IUpdatedBy<T>
    {
        int UpdatedById { get; set; }
        T UpdatedBy { get; set; }
    }
}