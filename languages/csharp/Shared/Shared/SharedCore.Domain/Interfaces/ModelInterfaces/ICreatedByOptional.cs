namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ICreatedByOptional<T>
    {
        int? CreatedById { get; set; }
        T CreatedBy { get; set; }
    }
}