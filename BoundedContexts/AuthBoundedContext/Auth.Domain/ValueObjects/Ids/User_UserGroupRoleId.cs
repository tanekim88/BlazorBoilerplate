using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class User_UserGroupRoleId : TypedIdValueBase<User_UserGroupRoleId>
    {
        private User_UserGroupRoleId()
        {
        }

        public User_UserGroupRoleId(int? id = null): base(id)
        {
        }
    }
}