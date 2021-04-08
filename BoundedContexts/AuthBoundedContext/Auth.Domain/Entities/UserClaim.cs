//%t:begin Intro
//%t:end Intro
using Auth.Domain.Entities;
using Auth.Domain.ValueObjects.Ids;
using System;
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
    public class UserClaim : Entity<UserClaimId>, IAggregateRoot
    {
        private UserClaim()
        {
        }

        public UserClaim(UserId userId, string claimType, string claimValue/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , UserClaimId? id = null)
        {
            if (id is null)
            {
                id = new UserClaimId();
            }

            Id = id;
            UserId = userId;
            ClaimType = claimType;
            ClaimValue = claimValue;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        public virtual User User { get; private set; } = null !;
        public virtual UserId UserId { get; private set; } = null !;
        public string ClaimType { get; private set; }

        public string ClaimValue { get; private set; }

        //%s:begin Body
        public void UpdateClaimType(string claimType)
        {
            ClaimType = claimType;
        }

        public void UpdateClaimValue(string claimValue)
        {
            ClaimValue = claimValue;
        }
    //%s:end Body
    }
}