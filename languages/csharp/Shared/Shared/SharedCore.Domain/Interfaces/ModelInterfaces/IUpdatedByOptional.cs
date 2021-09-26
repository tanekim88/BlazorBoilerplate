namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface IUpdatedByOptional<T>
    {
        int? UpdatedById { get; set; }
        T UpdatedBy { get; set; }
    }
}