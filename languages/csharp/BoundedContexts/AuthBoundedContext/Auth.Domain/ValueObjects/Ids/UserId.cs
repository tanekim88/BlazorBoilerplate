using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserId : TypedIdValueBase<UserId>
    {
        private UserId()
        {
        }

        public UserId(int? id = null): base(id)
        {
        }
    }
}