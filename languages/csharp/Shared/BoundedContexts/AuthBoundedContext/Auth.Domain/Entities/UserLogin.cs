//%t:begin Intro
//%t:end Intro
using System;
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
    public class UserLogin : Entity<UserLoginId>, IAggregateRoot
    {
        private UserLogin()
        {
        }

        public UserLogin(string loginProvider, string providerKey, string providerDisplayName, UserId userId/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , UserLoginId? id = null)
        {
            if (id is null)
            {
                id = new UserLoginId();
            }

            Id = id;
            LoginProvider = loginProvider;
            ProviderKey = providerKey;
            ProviderDisplayName = providerDisplayName;
            UserId = userId;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }
        [Key]
        [Column(Order = 0)]
        public string LoginProvider { get; private set; }
        [Key]
        [Column(Order = 1)]
        public string ProviderKey { get; private set; }

        [ForeignKey(name: nameof(UserId))]
        public virtual User User { get; private set; } = null !;
        public string ProviderDisplayName { get; private set; }

        public virtual UserId UserId { get; private set; } = null !;
    //%s:begin Body
    //%s:end Body
    }
}