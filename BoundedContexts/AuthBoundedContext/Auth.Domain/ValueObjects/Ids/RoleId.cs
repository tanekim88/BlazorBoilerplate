using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class RoleId : TypedIdValueBase<RoleId>
    {
        private RoleId()
        {
        }

        public RoleId(int? id = null): base(id)
        {
        }
    }
}