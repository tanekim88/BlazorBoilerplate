using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using Core.Domain.Interfaces;

namespace Auth.Domain.Interfaces.RepositoryInterfaces
{
    public interface IUser_UserGroupRoleRepository : IRepository<User_UserGroupRole, User_UserGroupRoleId>
    {
    }
}