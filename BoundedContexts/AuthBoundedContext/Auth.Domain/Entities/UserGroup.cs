//%t:begin Intro
//%t:end Intro
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
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
    public class UserGroup : Entity<UserGroupId>, IAggregateRoot
    {
        private UserGroup()
        {
        }

        public UserGroup(/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        UserGroupId? id = null)
        {
            if (id is null)
            {
                id = new UserGroupId();
            }

            Id = id;
            ;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        private readonly List<UserGroupRole> _userGroupRoles = new List<UserGroupRole>();
        public virtual IReadOnlyCollection<UserGroupRole> UserGroupRoles => _userGroupRoles.AsReadOnly();
        private readonly List<User_UserGroup> _user_UserGroups = new List<User_UserGroup>();
        public virtual IReadOnlyCollection<User_UserGroup> User_UserGroups => _user_UserGroups.AsReadOnly();
    //%s:begin Body
    //%s:end Body
    }
}