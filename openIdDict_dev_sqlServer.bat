

dotnet ef migrations add %1 -c ApplicationDbContext -o Data/Migrations -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/Auth.Package/Server  -v
dotnet ef database update -c ApplicationDbContext -p ./Packages/SharedPackages/ServerLibrary.Package/ServerLibrary --startup-project ./Packages/Auth.Package/Server  -v

pause
