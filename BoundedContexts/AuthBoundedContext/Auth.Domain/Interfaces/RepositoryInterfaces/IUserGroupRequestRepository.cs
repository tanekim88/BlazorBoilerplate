using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Domain.Interfaces;

namespace Auth.Domain.Interfaces.RepositoryInterfaces
{
    public interface IUserGroupRequestRepository : IRepository<UserGroupRequest, UserGroupRequestId>
    {
    }
}