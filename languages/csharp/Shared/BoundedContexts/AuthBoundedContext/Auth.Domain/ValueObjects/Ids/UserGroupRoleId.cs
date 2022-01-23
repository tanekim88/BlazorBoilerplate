using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserGroupRoleId : TypedIdValueBase<UserGroupRoleId>
    {
        private UserGroupRoleId()
        {
        }

        public UserGroupRoleId(int? id = null): base(id)
        {
        }
    }
}