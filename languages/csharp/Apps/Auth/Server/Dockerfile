#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Apps/Auth/Server/Auth.Server.csproj", "Apps/Auth/Server/"]
COPY ["Shared/Shared/SharedCore.Application/SharedCore.Application.csproj", "Shared/Shared/SharedCore.Application/"]
COPY ["Shared/Shared/SharedCore.Domain/SharedCore.Domain.csproj", "Shared/Shared/SharedCore.Domain/"]
COPY ["Shared/Library/Shared/SharedLibrary.Application/SharedLibrary.Application.csproj", "Shared/Library/Shared/SharedLibrary.Application/"]
COPY ["Apps/Auth/Shared/Auth.Shared.csproj", "Apps/Auth/Shared/"]
COPY ["BoundedContexts/AuthBoundedContext/Auth.Infrastructure/Auth.Infrastructure.csproj", "BoundedContexts/AuthBoundedContext/Auth.Infrastructure/"]
COPY ["Shared/Core.Infrastructure/Core.Infrastructure.csproj", "Shared/Core.Infrastructure/"]
COPY ["Shared/Library/Shared/SharedLibrary.Infrastructure/SharedLibrary.Infrastructure.csproj", "Shared/Library/Shared/SharedLibrary.Infrastructure/"]
COPY ["Shared/Core.Application/Core.Application.csproj", "Shared/Core.Application/"]
COPY ["Shared/Core.Domain/Core.Domain.csproj", "Shared/Core.Domain/"]
COPY ["Shared/Shared/SharedCore.Infrastructure/SharedCore.Infrastructure.csproj", "Shared/Shared/SharedCore.Infrastructure/"]
COPY ["BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Application/SharedAuth.Application.csproj", "BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Application/"]
COPY ["BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Infrastructure/SharedAuth.Infrastructure.csproj", "BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Infrastructure/"]
COPY ["BoundedContexts/AuthBoundedContext/Auth.Domain/Auth.Domain.csproj", "BoundedContexts/AuthBoundedContext/Auth.Domain/"]
COPY ["BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Domain/SharedAuth.Domain.csproj", "BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Domain/"]
RUN dotnet restore "Apps/Auth/Server/Auth.Server.csproj"
COPY . .
WORKDIR "/src/Apps/Auth/Server"
RUN dotnet build "Auth.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Auth.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Auth.Server.dll"]
