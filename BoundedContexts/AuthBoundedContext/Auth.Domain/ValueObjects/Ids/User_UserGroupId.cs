using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class User_UserGroupId : TypedIdValueBase<User_UserGroupId>
    {
        private User_UserGroupId()
        {
        }

        public User_UserGroupId(int? id = null): base(id)
        {
        }
    }
}