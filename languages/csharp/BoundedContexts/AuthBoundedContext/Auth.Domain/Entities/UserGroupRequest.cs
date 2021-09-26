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
    public class UserGroupRequest : Entity<UserGroupRequestId>, IAggregateRoot
    {
        private UserGroupRequest()
        {
        }

        public UserGroupRequest(UserId userId, UserGroupId userGroupId/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , UserGroupRequestId? id = null)
        {
            if (id is null)
            {
                id = new UserGroupRequestId();
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
        private readonly List<User_UserGroup> _target_User_UserGroups = new List<User_UserGroup>();
        public virtual IReadOnlyCollection<User_UserGroup> Target_User_UserGroups => _target_User_UserGroups.AsReadOnly();
    //%s:begin Body
    //%s:end Body
    }
}