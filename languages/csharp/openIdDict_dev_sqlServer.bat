

@REM dotnet ef migrations add %1 -c AuthDbContext -o Data/Migrations -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server  -v --no-build
dotnet ef database update -c AuthDbContext -p ./BoundedContexts/AuthBoundedContext/Auth.Infrastructure --startup-project ./Apps/Auth/Server  -v --no-build

pause
