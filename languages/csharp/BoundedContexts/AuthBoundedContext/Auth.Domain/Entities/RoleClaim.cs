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
    public class RoleClaim : Entity<RoleClaimId>, IAggregateRoot
    {
        private RoleClaim()
        {
        }

        public RoleClaim(RoleId roleId, string claimType, string claimValue/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , RoleClaimId? id = null)
        {
            if (id is null)
            {
                id = new RoleClaimId();
            }

            Id = id;
            RoleId = roleId;
            ClaimType = claimType;
            ClaimValue = claimValue;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        [ForeignKey(name: nameof(RoleId))]
        public virtual Role Role { get; private set; } = null !;
        public virtual RoleId RoleId { get; private set; } = null !;
        public string ClaimType { get; private set; }

        public string ClaimValue { get; private set; }
    //%s:begin Body
    //%s:end Body
    }
}