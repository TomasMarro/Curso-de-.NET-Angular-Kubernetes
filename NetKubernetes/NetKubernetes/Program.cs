using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetKubernetes.Data;
using NetKubernetes.Domain.Models;
using NetKubernetes.Infraestructure.Authentication;
using NetKubernetes.Infraestructure.Authentication.Token;
using NetKubernetes.Infraestructure.Context;
using NetKubernetes.Infraestructure.Middleware;
using NetKubernetes.Infraestructure.Repositories.Inmuebles;
using NetKubernetes.Infraestructure.Repositories.Usuarios;
using NetKubernetes.Mapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(MapProfile));


builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.LogTo(
        Console.WriteLine, 
        new [] {DbLoggerCategory.Database.Command.Name}, LogLevel.Information
        ).EnableSensitiveDataLogging();
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection"));
});

builder.Services.AddScoped<IInmueblesRepository, InmueblesRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

builder.Services.AddControllers(opt =>{
        AuthorizationPolicy? policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        opt.Filters.Add(new AuthorizeFilter(policy));
});



IdentityBuilder? builderSecurity = builder.Services.AddIdentityCore<Usuario>();
IdentityBuilder? identityBuilder = new IdentityBuilder(builderSecurity.UserType, builder.Services);
identityBuilder.AddEntityFrameworkStores<AppDbContext>();
identityBuilder.AddSignInManager<SignInManager<Usuario>>();


builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
builder.Services.AddScoped<IUsuarioSession, UsuarioSession>();


SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes("Mipalabrasecretaesmuycortaparaserclavesecretaperolapongoigualporlasdudas"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("corsapp",
        builder =>
        {
            builder.WithOrigins("*")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseMiddleware<ManagerMiddleware>();

app.MapControllers();

app.UseCors("corsapp");


using( var ambiente = app.Services.CreateScope())
{
    var service = ambiente.ServiceProvider;

    try
    {
        var userManager = service.GetRequiredService<UserManager<Usuario>>();
        var context = service.GetRequiredService<AppDbContext>();

        await context.Database.MigrateAsync();

        await LoadDatabase.InsertData(context, userManager);
    }
    catch (Exception e)
    {
        var logging = service.GetRequiredService<ILogger<Program>>();
        logging.LogError(e, "Error en la migracion de la base de datos");
        throw;
    }
}

app.Run();

