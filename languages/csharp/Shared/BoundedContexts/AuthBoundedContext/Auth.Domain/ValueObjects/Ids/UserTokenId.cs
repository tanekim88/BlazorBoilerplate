using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserTokenId : TypedIdValueBase<UserTokenId>
    {
        private UserTokenId()
        {
        }

        public UserTokenId(int? id = null): base(id)
        {
        }
    }
}