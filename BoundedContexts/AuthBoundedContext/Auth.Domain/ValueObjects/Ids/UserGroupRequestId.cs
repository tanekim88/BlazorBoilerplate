using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserGroupRequestId : TypedIdValueBase<UserGroupRequestId>
    {
        private UserGroupRequestId()
        {
        }

        public UserGroupRequestId(int? id = null): base(id)
        {
        }
    }
}