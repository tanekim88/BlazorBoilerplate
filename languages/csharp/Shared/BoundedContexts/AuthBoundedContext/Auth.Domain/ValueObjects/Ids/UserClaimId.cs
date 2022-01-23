using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids
{
    public class UserClaimId : TypedIdValueBase<UserClaimId>
    {
        private UserClaimId()
        {
        }

        public UserClaimId(int? id = null): base(id)
        {
        }
    }
}