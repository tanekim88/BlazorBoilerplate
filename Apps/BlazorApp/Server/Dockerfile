#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Apps/SolidApp/Server/SolidApp.Server.csproj", "Apps/SolidApp/Server/"]
COPY ["Apps/SolidApp/Shared/SolidApp.Shared.csproj", "Apps/SolidApp/Shared/"]
COPY ["BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Application/SharedAuth.Application.csproj", "BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Application/"]
COPY ["Shared/Core.Infrastructure/Core.Infrastructure.csproj", "Shared/Core.Infrastructure/"]
COPY ["Shared/Library/Shared/SharedLibrary.Infrastructure/SharedLibrary.Infrastructure.csproj", "Shared/Library/Shared/SharedLibrary.Infrastructure/"]
COPY ["Shared/Library/Shared/SharedLibrary.Application/SharedLibrary.Application.csproj", "Shared/Library/Shared/SharedLibrary.Application/"]
COPY ["Shared/Shared/SharedCore.Domain/SharedCore.Domain.csproj", "Shared/Shared/SharedCore.Domain/"]
COPY ["Shared/Core.Application/Core.Application.csproj", "Shared/Core.Application/"]
COPY ["Shared/Core.Domain/Core.Domain.csproj", "Shared/Core.Domain/"]
COPY ["Shared/Shared/SharedCore.Infrastructure/SharedCore.Infrastructure.csproj", "Shared/Shared/SharedCore.Infrastructure/"]
COPY ["Shared/Shared/SharedCore.Application/SharedCore.Application.csproj", "Shared/Shared/SharedCore.Application/"]
COPY ["BoundedContexts/AuthBoundedContext/Auth.Infrastructure/Auth.Infrastructure.csproj", "BoundedContexts/AuthBoundedContext/Auth.Infrastructure/"]
COPY ["BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Infrastructure/SharedAuth.Infrastructure.csproj", "BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Infrastructure/"]
COPY ["BoundedContexts/AuthBoundedContext/Auth.Domain/Auth.Domain.csproj", "BoundedContexts/AuthBoundedContext/Auth.Domain/"]
COPY ["BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Domain/SharedAuth.Domain.csproj", "BoundedContexts/AuthBoundedContext/Shared/SharedAuth.Domain/"]
COPY ["Apps/SolidApp/Client/SolidApp.Client.csproj", "Apps/SolidApp/Client/"]
COPY ["Shared/Presentation/Shared/SharedPresentation.Application/SharedPresentation.Application.csproj", "Shared/Presentation/Shared/SharedPresentation.Application/"]
COPY ["Shared/Presentation/Shared/SharedPresentation.Domain/SharedPresentation.Domain.csproj", "Shared/Presentation/Shared/SharedPresentation.Domain/"]
RUN dotnet restore "Apps/SolidApp/Server/SolidApp.Server.csproj"
COPY . .
WORKDIR "/src/Apps/SolidApp/Server"
RUN dotnet build "SolidApp.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SolidApp.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SolidApp.Server.dll"]
