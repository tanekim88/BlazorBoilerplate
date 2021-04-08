namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ISentByOptional<TUser>
    {
        int? SentById { get; set; }
        TUser SentBy { get; set; }
    }
}