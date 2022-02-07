

using Auth.Domain.Entities;
using Auth.Domain.Interfaces.RepositoryInterfaces;
using Auth.Domain.Specs.RoleClaimSpecs;
using Auth.Domain.Specs.RoleSpecs;
using Auth.Domain.ValueObjects.Ids;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;



namespace Auth.Infrastructure.Modules.IdentityServerModule.Models
{
    public class CustomRoleStore :
        IRoleStore<IdentityRole<RoleId>>,
        IRoleClaimStore<IdentityRole<RoleId>>
    {
        private readonly IRoleClaimRepository _roleClaimRepository;
        private readonly IRoleRepository _roleRepository;

        public CustomRoleStore(
            IRoleRepository roleRepository,
            IRoleClaimRepository roleClaimRepository
        )
        {
            _roleRepository = roleRepository;
            _roleClaimRepository = roleClaimRepository;
        }


         //IRoleStore<IdentityRole> Members

        public async Task<IdentityResult> CreateAsync(IdentityRole<RoleId> role, CancellationToken cancellationToken)
        {
            try
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (role == null)
                    throw new ArgumentNullException(paramName: nameof(role));

                var roleEntity = GetRoleEntity(value: role);

                _roleRepository.AddAsync(entity: roleEntity);

                await _roleRepository.SaveChangesAsync(cancellationToken: cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.Message });
            }
        }

        public async Task<IdentityResult> DeleteAsync(IdentityRole<RoleId> role, CancellationToken cancellationToken)
        {
            try
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (role == null)
                    throw new ArgumentNullException(paramName: nameof(role));

                await _roleRepository.DeleteByIdAsync(id: role.Id, cancellationToken: cancellationToken);

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(new IdentityError { Code = ex.Message, Description = ex.Message });
            }
        }

        public async Task<IdentityRole<RoleId>> FindByIdAsync(string strRoleId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var intRoleId = int.Parse(strRoleId);
            var roleId = new RoleId(intRoleId);
            var roleEntity = await _roleRepository.GetByIdAsync(id: roleId, cancellationToken: cancellationToken);

            return GetIdentityRole(value: roleEntity);
        }

        public async Task<IdentityRole<RoleId>> FindByNameAsync(string normalizedRoleName,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (string.IsNullOrWhiteSpace(value: normalizedRoleName))
                throw new ArgumentNullException(paramName: nameof(normalizedRoleName));

            var roleEntity =
                await _roleRepository.FirstAsync(spec: new RolesByNormalizedNameSpec(normalizedName: normalizedRoleName));
            return GetIdentityRole(value: roleEntity);
        }

        public async Task<string> GetNormalizedRoleNameAsync(IdentityRole<RoleId> role,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            return role.NormalizedName;
        }

        public async Task<string> GetRoleIdAsync(IdentityRole<RoleId> role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            return role.Id.ToString();
        }

        public async Task<string> GetRoleNameAsync(IdentityRole<RoleId> role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            return role.Name;
        }

        public async Task SetNormalizedRoleNameAsync(IdentityRole<RoleId> role, string normalizedName,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            role.NormalizedName = normalizedName;
        }

        public async Task SetRoleNameAsync(IdentityRole<RoleId> role, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            role.Name = roleName;
        }

        public async Task<IdentityResult> UpdateAsync(IdentityRole<RoleId> role, CancellationToken cancellationToken)
        {
            try
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (role == null)
                    throw new ArgumentNullException(paramName: nameof(role));

                var roleEntity = GetRoleEntity(value: role);

                _roleRepository.Update(entity: roleEntity);
                await _roleRepository.SaveChangesAsync(cancellationToken: cancellationToken);

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

        

         //IRoleClaimStore<IdentityRole> Members

        public async Task<IList<Claim>> GetClaimsAsync(IdentityRole<RoleId> role,
            CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            var result =
                await _roleClaimRepository.ListAsync(spec: new RoleClaimsToClaimsByRoleIdSpec(roleId: role.Id),
                    cancellationToken: cancellationToken);

            return result.ToList();
        }

        public async Task AddClaimAsync(IdentityRole<RoleId> role, Claim claim,
            CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            if (claim == null)
                throw new ArgumentNullException(paramName: nameof(claim));

            var roleClaimEntity = new RoleClaim
            (
                id: new RoleClaimId(0),
                claimType: claim.Type,
                claimValue: claim.Value,
                roleId: role.Id
            );

            await _roleClaimRepository.AddAsync(entity: roleClaimEntity);
            await _roleClaimRepository.SaveChangesAsync(cancellationToken: cancellationToken);
        }

        public async Task RemoveClaimAsync(IdentityRole<RoleId> role, Claim claim,
            CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (role == null)
                throw new ArgumentNullException(paramName: nameof(role));

            if (claim == null)
                throw new ArgumentNullException(paramName: nameof(claim));

            var roleClaimEntity = await _roleClaimRepository.FirstOrDefaultAsync(spec: new RoleClaimsByRoleIdAndClaimTypeAndClaimValueSpec(role.Id, claim.Type, claim.Value));

            if (roleClaimEntity is not null)
                if (roleClaimEntity.ClaimType == claim.Type && roleClaimEntity.ClaimValue == claim.Value)
                    await _roleClaimRepository.DeleteByIdAsync(id: roleClaimEntity.Id,
                        cancellationToken: cancellationToken);
        }

        

         //Private Methods

        private Role GetRoleEntity(IdentityRole<RoleId> value)
        {
            return value == null
                ? default
                : new Role(id: value.Id, concurrencyStamp: value.ConcurrencyStamp, name: value.Name,
                    normalizedName: value.NormalizedName);
        }

        private IdentityRole<RoleId> GetIdentityRole(Role value)
        {
            return value == null
                ? default
                : new IdentityRole<RoleId>
                {
                    ConcurrencyStamp = value.ConcurrencyStamp,
                    Id = value.Id,
                    Name = value.Name,
                    NormalizedName = value.NormalizedName
                };
        }

        
    }
}