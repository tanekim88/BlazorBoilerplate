namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ICreatedBy<T>
    {
        int CreatedById { get; set; }
        T CreatedBy { get; set; }
    }
}