//%t:begin Intro
//%t:end Intro
using Auth.Domain.ValueObjects.Ids;
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
    public class User_UserGroupRole : Entity<User_UserGroupRoleId>, IAggregateRoot
    {
        private User_UserGroupRole()
        {
        }

        public User_UserGroupRole(UserId userId, UserGroupRoleId userGroupRoleId/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , User_UserGroupRoleId? id = null)
        {
            if (id is null)
            {
                id = new User_UserGroupRoleId();
            }

            Id = id;
            UserId = userId;
            UserGroupRoleId = userGroupRoleId;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        [Key]
        [Column(Order = 0)]
        public virtual UserId UserId { get; private set; } = null !;
        [ForeignKey(name: nameof(UserId))]
        public virtual User User { get; private set; } = null !;
        [Key]
        [Column(Order = 1)]
        public virtual UserGroupRoleId UserGroupRoleId { get; private set; } = null !;
        [ForeignKey(name: nameof(UserGroupRoleId))]
        public virtual UserGroupRole UserGroupRole { get; private set; } = null !;
    //%s:begin Body
    //%s:end Body
    }
}