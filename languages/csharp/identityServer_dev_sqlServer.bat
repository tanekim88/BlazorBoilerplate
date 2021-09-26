dotnet clean
rmdir /S /Q Packages\SharedPackages\ServerLibrary.Package\ServerLibrary\Data\Migrations
mkdir Packages\SharedPackages\ServerLibrary.Package\ServerLibrary\Data\Migrations
del /F /Q "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Dev.mdf"
del /F /Q "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Dev_log.ldf"

dotnet ef migrations add InitialPersistedGrantDbMigration -c PersistedGrantDbContext -o Data/Migrations/IdentityServer/PersistedGrantDb -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/IdentityServer.Package/IdentityServer -v
dotnet ef database update -c PersistedGrantDbContext -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/IdentityServer.Package/IdentityServer -v

dotnet ef migrations add InitialConfigurationDbMigration -c ConfigurationDbContext -o Data/Migrations/IdentityServer/ConfigurationDb -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/IdentityServer.Package/IdentityServer -v
dotnet ef database update -c ConfigurationDbContext -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/IdentityServer.Package/IdentityServer -v
 
dotnet ef migrations add InitialDbMigration -c ApplicationDbContext -o Data/Migrations -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/IdentityServer.Package/IdentityServer  -v
dotnet ef database update -c ApplicationDbContext -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/IdentityServer.Package/IdentityServer  -v

pause
