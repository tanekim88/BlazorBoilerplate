dotnet clean
rmdir /S /Q BoundedContexts\AuthBoundedContext\Auth.Infrastructure\Data\
mkdir BoundedContexts\AuthBoundedContext\Auth.Infrastructure\Data\Migrations
del /F /Q "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Dev.mdf"
del /F /Q "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Dev_log.ldf"

dotnet ef migrations add InitialPersistedGrantDbMigration -c PersistedGrantDbContext -o Data/Migrations/IdentityServer/PersistedGrantDb -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server
dotnet ef database update -c PersistedGrantDbContext -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server

dotnet ef migrations add InitialConfigurationDbMigration -c ConfigurationDbContext -o Data/Migrations/IdentityServer/ConfigurationDb -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server
dotnet ef database update -c ConfigurationDbContext -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server
 
dotnet ef migrations add InitialDbMigration -c ApplicationDbContext -o Data/Migrations -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server  -v
dotnet ef database update -c ApplicationDbContext -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server  -v

pause
