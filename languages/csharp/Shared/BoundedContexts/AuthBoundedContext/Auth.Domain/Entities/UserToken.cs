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
    public class UserToken : Entity<UserTokenId>, IAggregateRoot
    {
        private UserToken()
        {
        }

        public UserToken(UserId userId, string loginProvider, string name, string value/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , UserTokenId? id = null)
        {
            if (id is null)
            {
                id = new UserTokenId();
            }

            Id = id;
            UserId = userId;
            LoginProvider = loginProvider;
            Name = name;
            Value = value;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }
        [Key]
        [Column(Order =0)]
        public virtual UserId UserId { get; private set; } = null !;
        [Key]
        [Column(Order = 1)]
        public string LoginProvider { get; private set; }
        [Key]
        [Column(Order = 3)]
        public string Name { get; private set; }

        [ForeignKey(name: nameof(UserId))]
        public virtual User User { get; private set; } = null !;
        public string Value { get; private set; }
    //%s:begin Body
    //%s:end Body
    }
}