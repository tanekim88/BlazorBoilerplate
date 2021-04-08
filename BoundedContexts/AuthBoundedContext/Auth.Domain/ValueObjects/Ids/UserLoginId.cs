using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserLoginId : TypedIdValueBase<UserLoginId>
    {
        private UserLoginId()
        {
        }

        public UserLoginId(int? id = null): base(id)
        {
        }
    }
}