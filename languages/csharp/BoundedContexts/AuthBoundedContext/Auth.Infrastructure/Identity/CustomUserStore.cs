

using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.Specs.RoleSpecs;
using Auth.Domain.Specs.User_RoleSpecs;
using Auth.Domain.Specs.UserClaimSpecs;
using Auth.Domain.Specs.UserLoginSpecs;
using Auth.Domain.Specs.UserSpecs;
using Auth.Domain.ValueObjects.Ids;
using Mapster;
using Microsoft.AspNetCore.Identity;
using SharedAuth.Application.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;



namespace Auth.Infrastructure.Identity
{
    public class CustomUserStore :
        IUserStore<UserModel>,
        IUserPasswordStore<UserModel>,
        IUserEmailStore<UserModel>,
        IUserLoginStore<UserModel>,
        IUserRoleStore<UserModel>,
        IUserSecurityStampStore<UserModel>,
        IUserClaimStore<UserModel>,
        IUserAuthenticationTokenStore<UserModel>,
        IUserTwoFactorStore<UserModel>,
        IUserPhoneNumberStore<UserModel>,
        IUserLockoutStore<UserModel>,
        IQueryableUserStore<UserModel>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IUser_RoleRepository _user_RoleRepository;
        private readonly IUserClaimRepository _userClaimRepository;
        private readonly IUserLoginRepository _userLoginRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserTokenRepository _userTokenRepository;

        public CustomUserStore(
            IUserRepository userRepository,
            IUserTokenRepository userTokenRepository,
            IUserClaimRepository userClaimRepository,
            IUserLoginRepository userLoginRepository,
            IRoleRepository roleRepository,
            IUser_RoleRepository userRoleRepository
        )
        {
            _userRepository = userRepository;
            _userTokenRepository = userTokenRepository;
            _userClaimRepository = userClaimRepository;
            _userLoginRepository = userLoginRepository;
            _roleRepository = roleRepository;
            _user_RoleRepository = userRoleRepository;
        }

        public IQueryable<UserModel> Users { get; }

        //IQueryableUserStore<User> Members

        //public IQueryable<User> Users
        //{
        //    get
        //    {
        //        return _userRepository.ListAllAsync()
        //            .Select(x => getUser(x))
        //            .AsQueryable();
        //    }
        //}



        //IUserStore<User> Members

        public async Task<IdentityResult> CreateAsync(UserModel user, CancellationToken cancellationToken)
        {
            try
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (user == null)
                    throw new ArgumentNullException(paramName: nameof(user));

                var userEntity = GetUserEntity(userModel: user);

                await _userRepository.AddAsync(entity: userEntity);

                await _userRepository.SaveChangesAsync(cancellationToken: cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.Message });
            }
        }

        public async Task<IdentityResult> DeleteAsync(UserModel user, CancellationToken cancellationToken)
        {
            try
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (user == null)
                    throw new ArgumentNullException(paramName: nameof(user));

                var userId = new UserId(user.Id);

                await _userRepository.DeleteByIdAsync(id: userId);


                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.Message });
            }
        }

        public async Task<UserModel> FindByIdAsync(string strUserId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var intUserId = int.Parse(strUserId);
            var userId = new UserId(intUserId);

            var userEntity = await _userRepository.GetByIdAsync(id: userId);

            return GetUser(entity: userEntity);
        }

        public async Task<UserModel> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var userEntity =
                await _userRepository.FirstOrDefaultAsync(
                    spec: new UsersByNormalizedUserNameSpec(normalizedUserName: normalizedUserName));

            return GetUser(entity: userEntity);
        }

        public Task<string> GetNormalizedUserNameAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.NormalizedUserName);
        }

        public async Task<string> GetUserIdAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return user.Id.ToString();
        }

        public Task<string> GetUserNameAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.UserName);
        }

        public Task SetNormalizedUserNameAsync(UserModel user, string normalizedName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.NormalizedUserName = normalizedName;

            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(UserModel user, string userName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.UserName = userName;

            return Task.CompletedTask;
        }

        public async Task<IdentityResult> UpdateAsync(UserModel user, CancellationToken cancellationToken)
        {
            try
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (user == null)
                    throw new ArgumentNullException(paramName: nameof(user));

                var userEntity = GetUserEntity(userModel: user);

                _userRepository.Update(entity: userEntity);
                await _userRepository.SaveChangesAsync(cancellationToken: cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.Message });
            }
        }

        public void Dispose()
        {
            // Lifetimes of dependencies are managed by the IoC container, so disposal here is unnecessary.
        }



        //IUserPasswordStore<User> Members

        public Task SetPasswordHashAsync(UserModel user, string passwordHash, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.PasswordHash = passwordHash;

            return Task.CompletedTask;
        }

        public Task<string> GetPasswordHashAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: !string.IsNullOrWhiteSpace(value: user.PasswordHash));
        }



        //IUserEmailStore<User> Members

        public Task SetEmailAsync(UserModel user, string email, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.Email = email;

            return Task.CompletedTask;
        }

        public Task<string> GetEmailAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.EmailConfirmed);
        }

        public Task SetEmailConfirmedAsync(UserModel user, bool confirmed, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.EmailConfirmed = confirmed;

            return Task.CompletedTask;
        }

        public async Task<UserModel> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(value: normalizedEmail))
                throw new ArgumentNullException(paramName: nameof(normalizedEmail));

            var userEntity =
                await _userRepository.FirstOrDefaultAsync(
                    spec: new UsersByNormalizedEmailSpec(normalizedEmail: normalizedEmail));

            return GetUser(entity: userEntity);
        }

        public Task<string> GetNormalizedEmailAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.NormalizedEmail);
        }

        public Task SetNormalizedEmailAsync(UserModel user, string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.NormalizedEmail = normalizedEmail;

            return Task.CompletedTask;
        }



        //IUserLoginStore<User> Members

        public async Task AddLoginAsync(UserModel user, UserLoginInfo login, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (login == null)
                throw new ArgumentNullException(paramName: nameof(login));

            if (string.IsNullOrWhiteSpace(value: login.LoginProvider))
                throw new ArgumentNullException(paramName: nameof(login.LoginProvider));

            if (string.IsNullOrWhiteSpace(value: login.ProviderKey))
                throw new ArgumentNullException(paramName: nameof(login.ProviderKey));

            var userId = new UserId(user.Id);

            var loginEntity = new UserLogin(loginProvider: login.LoginProvider, providerKey: login.ProviderKey,
                providerDisplayName: login.ProviderDisplayName,
                userId: userId);

            await _userLoginRepository.AddAsync(entity: loginEntity);
            await _userLoginRepository.SaveChangesAsync(cancellationToken: cancellationToken);
        }

        public async Task RemoveLoginAsync(UserModel user, string loginProvider, string providerKey,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: loginProvider))
                throw new ArgumentNullException(paramName: nameof(loginProvider));

            if (string.IsNullOrWhiteSpace(value: providerKey))
                throw new ArgumentNullException(paramName: nameof(providerKey));

            await _userLoginRepository.DeleteByIdAsync(compositeKeys: new object[] { loginProvider, providerKey });
        }

        public async Task<IList<UserLoginInfo>> GetLoginsAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            var userId = new UserId(user.Id);

            var result = await _userLoginRepository.ListAsync(
                spec: new UserLoginToUserLoginInfoByUserIdSpec(userId: userId),
                cancellationToken: cancellationToken);

            return result.ToList();
        }

        public async Task<UserModel> FindByLoginAsync(string loginProvider, string providerKey,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (string.IsNullOrWhiteSpace(value: loginProvider))
                throw new ArgumentNullException(paramName: nameof(loginProvider));

            if (string.IsNullOrWhiteSpace(value: providerKey))
                throw new ArgumentNullException(paramName: nameof(providerKey));

            var loginEntity = await _userLoginRepository.GetByIdAsync(
                compositeKeys: new object[] { loginProvider, providerKey }, cancellationToken: cancellationToken);
            if (loginEntity is null)
                return default;

            var userEntity =
                await _userRepository.GetByIdAsync(id: loginEntity.UserId, cancellationToken: cancellationToken);

            return GetUser(entity: userEntity);
        }



        //IUserRoleStore<User> Members

        public async Task AddToRoleAsync(UserModel user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: roleName))
                throw new ArgumentNullException(paramName: nameof(roleName));

            var role = await _roleRepository.FirstOrDefaultAsync(spec: new RolesByNormalizedNameSpec(normalizedName: roleName));

            var userId = new UserId(user.Id);

            var user_role = new User_Role(userId: userId, roleId: role.Id);

            await _user_RoleRepository.AddAsync(entity: user_role);
            await _user_RoleRepository.SaveChangesAsync(cancellationToken: cancellationToken);
        }

        public async Task RemoveFromRoleAsync(UserModel user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: roleName))
                throw new ArgumentNullException(paramName: nameof(roleName));

            var userId = new UserId(user.Id);

            await _user_RoleRepository.DeleteAsync(
                spec: new User_RolesByUserIdAndNormalizedRoleNameSpec(userId: userId, normalizedRoleName: roleName));
        }

        public async Task<IList<string>> GetRolesAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            var userId = new UserId(user.Id);

            var result =
                await _user_RoleRepository.ListAsync(spec: new User_RolesToRoleNamesByUserIdSpec(userId: userId));

            return result.ToList();
        }

        public async Task<bool> IsInRoleAsync(UserModel user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: roleName))
                throw new ArgumentNullException(paramName: nameof(roleName));

            var userId = new UserId(user.Id);

            var result =
                await _user_RoleRepository.FirstOrDefaultAsync(
                    spec: new User_RolesByUserIdAndNormalizedRoleNameSpec(userId: userId,
                        normalizedRoleName: roleName));

            return result != null;
        }

        public async Task<IList<UserModel>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (string.IsNullOrWhiteSpace(value: roleName))
                throw new ArgumentNullException(paramName: nameof(roleName));

            var result =
                await _user_RoleRepository.ListAsync(
                    spec: new User_RolesToUsersByNormalizedRoleNameSpec(normalizedRoleName: roleName));

            var toReturn = result.Select(selector: user => GetUser(entity: user)).ToList();

            return toReturn;
        }



        //IUserSecurityStampStore<User> Members

        public Task SetSecurityStampAsync(UserModel user, string stamp, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.SecurityStamp = stamp;

            return Task.CompletedTask;
        }

        public Task<string> GetSecurityStampAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.SecurityStamp);
        }



        //IUserClaimStore<User> Members

        public async Task<IList<Claim>> GetClaimsAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            var userId = new UserId(user.Id);

            var result =
                await _userClaimRepository.ListAsync(spec: new UserClaimsToClaimsByUserIdSpec(userId: userId),
                    cancellationToken: cancellationToken);

            return result.ToList();
        }

        public async Task AddClaimsAsync(
            UserModel user,
            IEnumerable<Claim> claims,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (claims == null)
                throw new ArgumentNullException(paramName: nameof(claims));

            var userId = new UserId(user.Id);

            var claimEntities = claims.Select(selector: x => getUserClaimEntity(value: x, userId: userId));
            if (claimEntities.Count() > 0)
            {
                claimEntities.ToList().ForEach(action: async claimEntity =>
                {
                    await _userClaimRepository.AddAsync(entity: claimEntity);
                });

                await _userClaimRepository.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }

        public async Task ReplaceClaimAsync(UserModel user, Claim claim, Claim newClaim, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (claim == null)
                throw new ArgumentNullException(paramName: nameof(claim));

            if (newClaim == null)
                throw new ArgumentNullException(paramName: nameof(newClaim));

            var userId = new UserId(user.Id);

            var claimEntity =
                await _userClaimRepository.FirstOrDefaultAsync(
                    spec: new UserClaimsToClaimsByUserIdSpec(userId: userId),
                    cancellationToken: cancellationToken);

            if (claimEntity != null)
            {
                claimEntity.UpdateClaimType(claimType: newClaim.Type);
                claimEntity.UpdateClaimValue(claimValue: newClaim.Value);

                _userClaimRepository.Update(entity: claimEntity);
                await _userClaimRepository.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }

        public async Task RemoveClaimsAsync(UserModel user, IEnumerable<Claim> claims, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (claims == null)
                throw new ArgumentNullException(paramName: nameof(claims));

            var userId = new UserId(user.Id);

            var userClaimEntities =
                await _userClaimRepository.ListAsync(spec: new UserClaimsByUserIdSpec(userId: userId));
            if (claims.Count() > 0)
            {
                claims.ToList().ForEach(action: claim =>
                {
                    var userClaimEntity =
                        userClaimEntities.FirstOrDefault(predicate: x =>
                            x.ClaimType == claim.Type && x.ClaimValue == claim.Value);
                    _userClaimRepository.Remove(entity: userClaimEntity);
                });

                await _userClaimRepository.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }

        public async Task<IList<UserModel>> GetUsersForClaimAsync(Claim claim, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (claim == null)
                throw new ArgumentNullException(paramName: nameof(claim));

            var result =
                await _userClaimRepository.ListAsync(
                    spec: new UserClaimsToUsersByClaimTypeAndClaimValueSpec(claimType: claim.Type,
                        claimValue: claim.Value));
            var toReturn = result.Select(selector: x => GetUser(entity: x)).ToList();

            return toReturn;
        }



        //IUserAuthenticationTokenStore<User> Members

        public async Task SetTokenAsync(UserModel user, string loginProvider, string name, string value,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: loginProvider))
                throw new ArgumentNullException(paramName: nameof(loginProvider));

            if (string.IsNullOrWhiteSpace(value: name))
                throw new ArgumentNullException(paramName: nameof(name));

            var userId = new UserId(user.Id);

            var userTokenEntity =
                new UserToken(userId: userId, loginProvider: loginProvider, name: name, value: value);

            await _userTokenRepository.AddAsync(entity: userTokenEntity);
            await _userTokenRepository.SaveChangesAsync(cancellationToken: cancellationToken);
        }

        public async Task RemoveTokenAsync(UserModel user, string loginProvider, string name,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: loginProvider))
                throw new ArgumentNullException(paramName: nameof(loginProvider));

            if (string.IsNullOrWhiteSpace(value: name))
                throw new ArgumentNullException(paramName: nameof(name));

            await _userTokenRepository.DeleteByIdAsync(compositeKeys: new object[] { user.Id, loginProvider, name },
                cancellationToken: cancellationToken);
        }

        public async Task<string> GetTokenAsync(UserModel user, string loginProvider, string name,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            if (string.IsNullOrWhiteSpace(value: loginProvider))
                throw new ArgumentNullException(paramName: nameof(loginProvider));

            if (string.IsNullOrWhiteSpace(value: name))
                throw new ArgumentNullException(paramName: nameof(name));

            var userTokenEntity =
                await _userTokenRepository.GetByIdAsync(compositeKeys: new object[] { user.Id, loginProvider, name },
                    cancellationToken: cancellationToken);

            return userTokenEntity?.Name;
        }



        //IUserTwoFactorStore<User> Members

        public Task SetTwoFactorEnabledAsync(UserModel user, bool enabled, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.TwoFactorEnabled = enabled;

            return Task.CompletedTask;
        }

        public Task<bool> GetTwoFactorEnabledAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.TwoFactorEnabled);
        }



        //IUserPhoneNumberStore<User> Members

        public Task SetPhoneNumberAsync(UserModel user, string phoneNumber, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.PhoneNumber = phoneNumber;

            return Task.CompletedTask;
        }

        public Task<string> GetPhoneNumberAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.PhoneNumber);
        }

        public Task<bool> GetPhoneNumberConfirmedAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.PhoneNumberConfirmed);
        }

        public Task SetPhoneNumberConfirmedAsync(UserModel user, bool confirmed, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.PhoneNumberConfirmed = confirmed;

            return Task.CompletedTask;
        }



        //IUserLockoutStore<User> Members

        public Task<DateTimeOffset?> GetLockoutEndDateAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.LockoutEnd);
        }

        public Task SetLockoutEndDateAsync(UserModel user, DateTimeOffset? lockoutEnd, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.LockoutEnd = lockoutEnd;

            return Task.CompletedTask;
        }

        public Task<int> IncrementAccessFailedCountAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: ++user.AccessFailedCount);
        }

        public Task ResetAccessFailedCountAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.AccessFailedCount = 0;

            return Task.CompletedTask;
        }

        public Task<int> GetAccessFailedCountAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.AccessFailedCount);
        }

        public Task<bool> GetLockoutEnabledAsync(UserModel user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            return Task.FromResult(result: user.LockoutEnabled);
        }

        public Task SetLockoutEnabledAsync(UserModel user, bool enabled, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (user == null)
                throw new ArgumentNullException(paramName: nameof(user));

            user.LockoutEnabled = enabled;

            return Task.CompletedTask;
        }



        //Private Methods

        private User GetUserEntity(UserModel userModel)
        {
            if (userModel == null)
                return null;


            var userEntity = userModel.Adapt<User>();

            return userEntity;
        }

        private UserModel GetUser(User entity)
        {
            if (entity == null)
                return null;

            var result = new UserModel();
            populateUser(User: result, entity: entity);

            return result;
        }

        private void populateUser(UserModel User, User entity)
        {
            User.AccessFailedCount = entity.AccessFailedCount;
            User.ConcurrencyStamp = entity.ConcurrencyStamp;
            User.Email = entity.Email;
            User.EmailConfirmed = entity.EmailConfirmed;
            User.Id = entity.Id.Id;
            User.LockoutEnabled = entity.LockoutEnabled;
            User.LockoutEnd = entity.LockoutEnd;
            User.NormalizedEmail = entity.NormalizedEmail;
            User.NormalizedUserName = entity.NormalizedUserName;
            User.PasswordHash = entity.PasswordHash;
            User.PhoneNumber = entity.PhoneNumber;
            User.PhoneNumberConfirmed = entity.PhoneNumberConfirmed;
            User.SecurityStamp = entity.SecurityStamp;
            User.TwoFactorEnabled = entity.TwoFactorEnabled;
            User.UserName = entity.UserName;
        }

        private UserClaim getUserClaimEntity(Claim value, UserId userId)
        {
            return value == null
                ? default
                : new UserClaim(claimType: value.Type, claimValue: value.Value, userId: userId);
        }


    }
}