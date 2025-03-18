# Imagen base para ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:5000

# Establecer usuario


# Imagen para la construcción
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar archivos de proyecto en sus respectivas carpetas
COPY ["NetKubernetes/NetKubernetes.Api.csproj", "src/NetKubernetes/"]
COPY ["NetKubernetes.Application/NetKubernetes.Application.csproj", "src/NetKubernetes.Application/"]
COPY ["NetKubernetes.Domain/NetKubernetes.Domain.csproj", "src/NetKubernetes.Domain/"]
COPY ["NetKubernetes.Infraestructure/NetKubernetes.Infraestructure.csproj", "src/NetKubernetes.Infraestructure/"]

# Restaurar dependencias
RUN dotnet restore "src/NetKubernetes/NetKubernetes.Api.csproj"

# Copiar el código restante
COPY . .

# Establecer el directorio de trabajo correctamente
WORKDIR "/src/NetKubernetes/"

# Construir el proyecto
RUN dotnet build "NetKubernetes.Api.csproj" -c Development -o /app/build

# Publicar el proyecto
FROM build AS publish
RUN dotnet publish "NetKubernetes.Api.csproj" -c Development -o /app/publish /p:UseAppHost=false

# Imagen final para ejecución
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .


ENTRYPOINT ["dotnet", "NetKubernetes.Api.dll"]
