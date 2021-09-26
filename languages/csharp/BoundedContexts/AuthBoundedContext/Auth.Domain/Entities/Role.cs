//%t:begin Intro
//%t:end Intro
using Auth.Domain.ValueObjects.Ids;
//%s:begin Header
//%s:end Header
using Core.Domain;
using Core.Domain.Interfaces;
using System.Collections.Generic;

namespace Auth.Domain.Entities
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {
        private Role()
        {
        }

        public Role(string name, string normalizedName, string concurrencyStamp/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , RoleId? id = null)
        {
            if (id is null)
            {
                id = new RoleId();
            }

            Id = id;
            Name = name;
            NormalizedName = normalizedName;
            ConcurrencyStamp = concurrencyStamp;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        private readonly List<User_Role> _role_Users = new List<User_Role>();
        public virtual IReadOnlyCollection<User_Role> Role_Users => _role_Users.AsReadOnly();
        private readonly List<RoleClaim> _roleClaims = new List<RoleClaim>();
        public virtual IReadOnlyCollection<RoleClaim> RoleClaims => _roleClaims.AsReadOnly();
        public string Name { get; private set; }

        public string NormalizedName { get; private set; }

        public string ConcurrencyStamp { get; private set; }
    //%s:begin Body
    //%s:end Body
    }
}