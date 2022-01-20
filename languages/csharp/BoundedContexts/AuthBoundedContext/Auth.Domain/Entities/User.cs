//%t:begin Intro
//%t:end Intro
using Auth.Domain.ValueObjects.Ids;
using Core.Domain;
using Core.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
//%s:begin Header
//%s:end Header

namespace Auth.Domain.Entities
{
    public class User : Entity<UserId>, IAggregateRoot
    {
        private User()
        {
        }

        public User(string firstName, bool twoFactorEnabled, bool phoneNumberConfirmed, string phoneNumber, string concurrencyStamp, string securityStamp, string passwordHash, bool emailConfirmed, string normalizedEmail, string email, bool lockoutEnabled, string normalizedUserName, string lastName, string middleInitial, string userName, int accessFailedCount, DateTimeOffset? lockoutEnd = null/*%s:begin ConstructorParameters*/
        /*%s:end ConstructorParameters*/
        , UserId? id = null)
        {
            if (id is null)
            {
                id = new UserId();
            }

            Id = id;
            FirstName = firstName;
            TwoFactorEnabled = twoFactorEnabled;
            PhoneNumberConfirmed = phoneNumberConfirmed;
            PhoneNumber = phoneNumber;
            ConcurrencyStamp = concurrencyStamp;
            SecurityStamp = securityStamp;
            PasswordHash = passwordHash;
            EmailConfirmed = emailConfirmed;
            NormalizedEmail = normalizedEmail;
            Email = email;
            LockoutEnabled = lockoutEnabled;
            NormalizedUserName = normalizedUserName;
            LastName = lastName;
            MiddleInitial = middleInitial;
            UserName = userName;
            AccessFailedCount = accessFailedCount;
            LockoutEnd = lockoutEnd;
        /*%s:begin ConstructorBody*/
        /*%s:end ConstructorBody*/
        }

        public string FirstName { get; private set; }

        public bool TwoFactorEnabled { get; private set; }

        public bool PhoneNumberConfirmed { get; private set; }

        public string PhoneNumber { get; private set; }

        public string ConcurrencyStamp { get; private set; }

        public string SecurityStamp { get; private set; }

        public string PasswordHash { get; private set; }

        public bool EmailConfirmed { get; private set; }

        public string NormalizedEmail { get; private set; }

        public string Email { get; private set; }

        public bool LockoutEnabled { get; private set; }

        public string NormalizedUserName { get; private set; }

        [InverseProperty(property: nameof(User_UserGroupRole.User))]
        private readonly List<User_UserGroupRole> _user_UserGroupRoles = new List<User_UserGroupRole>();
        public virtual IReadOnlyCollection<User_UserGroupRole> User_UserGroupRoles => _user_UserGroupRoles.AsReadOnly();
        [InverseProperty(property: nameof(User_UserGroup.User))]
        private readonly List<User_UserGroup> _user_UserGroups = new List<User_UserGroup>();
        public virtual IReadOnlyCollection<User_UserGroup> User_UserGroups => _user_UserGroups.AsReadOnly();
        private readonly List<User_Role> _user_Roles = new List<User_Role>();
        public virtual IReadOnlyCollection<User_Role> User_Roles => _user_Roles.AsReadOnly();
        private readonly List<UserToken> _userTokens = new List<UserToken>();
        public virtual IReadOnlyCollection<UserToken> UserTokens => _userTokens.AsReadOnly();
        private readonly List<UserLogin> _userLogins = new List<UserLogin>();
        public virtual IReadOnlyCollection<UserLogin> UserLogins => _userLogins.AsReadOnly();
        private readonly List<UserClaim> _userClaims = new List<UserClaim>();
        public virtual IReadOnlyCollection<UserClaim> UserClaims => _userClaims.AsReadOnly();
        public string LastName { get; private set; }

        public string MiddleInitial { get; private set; }

        public string UserName { get; private set; }

        public int AccessFailedCount { get; private set; }

        public DateTimeOffset? LockoutEnd { get; private set; }
    //%s:begin Body
    //%s:end Body
    }
}