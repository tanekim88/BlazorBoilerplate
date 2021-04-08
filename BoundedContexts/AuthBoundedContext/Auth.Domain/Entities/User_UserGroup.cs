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
    public class User_UserGroup : Entity<User_UserGroupId>, IAggregateRoot
    {
        private User_UserGroup()
        {
        }

        public User_UserGroup(UserId userId, UserGroupId userGroupId/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , User_UserGroupId? id = null)
        {
            if (id is null)
            {
                id = new User_UserGroupId();
            }

            Id = id;
            UserId = userId;
            UserGroupId = userGroupId;
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
        public virtual UserGroupId UserGroupId { get; private set; } = null !;
        [ForeignKey(name: nameof(UserGroupId))]
        public virtual UserGroup UserGroup { get; private set; } = null !;
        private readonly List<User_UserGroupRole> _user_UserGroupRoles = new List<User_UserGroupRole>();
        public virtual IReadOnlyCollection<User_UserGroupRole> User_UserGroupRoles => _user_UserGroupRoles.AsReadOnly();
    //%s:begin Body
    //%s:end Body
    }
}