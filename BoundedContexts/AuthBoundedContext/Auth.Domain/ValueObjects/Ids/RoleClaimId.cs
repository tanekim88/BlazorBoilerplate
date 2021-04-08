using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class RoleClaimId : TypedIdValueBase<RoleClaimId>
    {
        private RoleClaimId()
        {
        }

        public RoleClaimId(int? id = null): base(id)
        {
        }
    }
}