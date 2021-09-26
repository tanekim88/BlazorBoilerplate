namespace SharedCore.Domain.Interfaces.ModelInterfaces
{
    public interface ISentTo<TUser>
    {
        int SentToId { get; set; }
        TUser SentTo { get; set; }
    }
}