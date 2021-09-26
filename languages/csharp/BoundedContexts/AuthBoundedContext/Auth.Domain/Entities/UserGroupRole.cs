//%t:begin Intro
//%t:end Intro
using Auth.Domain.ValueObjects.Ids;
using System;
using Auth.Domain.Entities;
using Core.Domain.Entities;
//%s:begin Header
//%s:end Header
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Auth.Domain.ValueObjects.Ids;
using Core.Domain;
using Core.Domain.Interfaces;
using System.Collections.ObjectModel;
using System.Collections.Generic;

namespace Auth.Domain.Entities
{
    public class UserGroupRole : Entity<UserGroupRoleId>, IAggregateRoot
    {
        private UserGroupRole()
        {
        }

        public UserGroupRole(string name, UserGroupId userGroupId/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , UserGroupRoleId? id = null)
        {
            if (id is null)
            {
                id = new UserGroupRoleId();
            }

            Id = id;
            Name = name;
            UserGroupId = userGroupId;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        public string Name { get; private set; }

        public virtual UserGroupId UserGroupId { get; private set; } = null !;
        [ForeignKey(name: nameof(UserGroupId))]
        public virtual UserGroup UserGroup { get; private set; } = null !;
        [InverseProperty(property: nameof(User_UserGroupRole.UserGroupRole))]
        private readonly List<User_UserGroupRole> _user_UserGroupRoles = new List<User_UserGroupRole>();
        public virtual IReadOnlyCollection<User_UserGroupRole> User_UserGroupRoles => _user_UserGroupRoles.AsReadOnly();
    //%s:begin Body
    //%s:end Body
    }
}