using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class User_RoleId : TypedIdValueBase<User_RoleId>
    {
        private User_RoleId()
        {
        }

        public User_RoleId(int? id = null): base(id)
        {
        }
    }
}