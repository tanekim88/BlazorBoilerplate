dotnet clean
rmdir /S /Q Shared\BoundedContexts\AuthBoundedContext\Auth.Infrastructure\Data\
mkdir Shared\BoundedContexts\AuthBoundedContext\Auth.Infrastructure\Data\Migrations
del /F /Q "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Dev.mdf"
del /F /Q "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Dev_log.ldf"

dotnet ef migrations add InitialPersistedGrantDbMigration -c PersistedGrantDbContext -o Data/Migrations/IdentityServer/PersistedGrantDb -p ./Shared/BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server
dotnet ef database update -c PersistedGrantDbContext -p ./Shared/BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server

dotnet ef migrations add InitialConfigurationDbMigration -c ConfigurationDbContext -o Data/Migrations/IdentityServer/ConfigurationDb -p ./Shared/BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server
dotnet ef database update -c ConfigurationDbContext -p ./Shared/BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server
 
dotnet ef migrations add InitialDbMigration -c AuthDbContext -o Data/Migrations -p ./Shared/BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server  -v
dotnet ef database update -c AuthDbContext -p ./Shared/BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server  -v

pause
