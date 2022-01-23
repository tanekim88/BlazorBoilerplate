using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Domain.Interfaces;

namespace Auth.Domain.Interfaces.RepositoryInterfaces
{
    public interface IUser_UserGroupRepository : IRepository<User_UserGroup, User_UserGroupId>
    {
    }
}