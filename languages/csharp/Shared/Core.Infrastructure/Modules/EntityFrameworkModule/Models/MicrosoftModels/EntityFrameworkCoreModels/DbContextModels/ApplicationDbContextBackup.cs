//

//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;
//using SharedCore.Application.Models;
//using SharedCore.Application.Models.ReferenceModels;
//using System;

//

//namespace Core.Infrastructure.DbContexts
//{
//    public class ApplicationDbContextBackup : 
//        IdentityDbContext<UserModel, RoleModel, Guid, UserClaimModel,
//            User_RoleModel, UserLoginModel, RoleClaimModel, UserTokenModel>

//    {
//        public ApplicationDbContextBackup(DbContextOptions options) : base(options: options)
//        {
//        }

//        public DbSet<EnumReferenceModel> EnumReferences { get; set; }

//        protected override void OnModelCreating(ModelBuilder builder)
//        {
//            base.OnModelCreating(builder: builder);
//        }

//        //public int SaveChanges(IHttpContextAccessor _httpContextAccessor)
//        //{
//        //    var userId = Convert.ToInt32(_httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier));

//        //    var timeStampEntities = ChangeTracker.Entries().Where(x =>
//        //    x.State == EntityState.Added || x.State == EntityState.Modified);

//        //    foreach (var entity in timeStampEntities)
//        //    {
//        //        if (entity is IUpdatedAt)
//        //        {
//        //            ((IUpdatedAt)entity).UpdatedAt = DateTime.UtcNow;
//        //        }

//        //        if (entity is IUpdatedAtOptional)
//        //        {
//        //            ((IUpdatedAtOptional)entity).UpdatedAt = DateTime.UtcNow;
//        //        }

//        //        if (entity is IUpdatedBy)
//        //        {
//        //            ((IUpdatedBy)entity).UpdatedById = userId;
//        //        }

//        //        if (entity is IUpdatedByOptional)
//        //        {
//        //            ((IUpdatedByOptional)entity).UpdatedById = userId;
//        //        }

//        //        if (entity.State == EntityState.Added)
//        //        {
//        //            if (entity is ICreatedAt)
//        //            {
//        //                ((ICreatedAt)entity).CreatedAt = DateTime.UtcNow;
//        //            }

//        //            if (entity is ICreatedAtOptional)
//        //            {
//        //                ((ICreatedAtOptional)entity).CreatedAt = DateTime.UtcNow;
//        //            }

//        //            if (entity is ICreatedBy)
//        //            {
//        //                ((ICreatedBy)entity).CreatedById = userId;
//        //            }

//        //            if (entity is ICreatedByOptional)
//        //            {
//        //                ((ICreatedByOptional)entity).CreatedById = userId;
//        //            }

//        //            if (entity is IGlobalId)
//        //            {
//        //                var entityWithRelayId = (IGlobalId)entity;
//        //                entityWithRelayId.GlobalId = Guid.NewGuid().ToString();
//        //            }
//        //        }
//        //    }

//        //    return base.SaveChanges();
//        //}
//    }
//}