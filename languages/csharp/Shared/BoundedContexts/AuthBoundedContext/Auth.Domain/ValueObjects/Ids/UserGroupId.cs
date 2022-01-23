using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserGroupId : TypedIdValueBase<UserGroupId>
    {
        private UserGroupId()
        {
        }

        public UserGroupId(int? id = null): base(id)
        {
        }
    }
}