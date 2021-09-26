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
    public class User_Role : Entity<User_RoleId>, IAggregateRoot
    {
        private User_Role()
        {
        }

        public User_Role(UserId userId, RoleId roleId/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , User_RoleId? id = null)
        {
            if (id is null)
            {
                id = new User_RoleId();
            }

            Id = id;
            UserId = userId;
            RoleId = roleId;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        public virtual UserId UserId { get; private set; } = null !;
        public virtual RoleId RoleId { get; private set; } = null !;
        [ForeignKey(name: nameof(UserId))]
        public virtual User User { get; private set; } = null !;
        [ForeignKey(name: nameof(RoleId))]
        public virtual Role Role { get; private set; } = null !;
    //%s:begin Body
    //%s:end Body
    }
}