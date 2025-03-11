using Microsoft.AspNetCore.Identity;
using NetKubernetes.Domain.Dtos.Usuario;
using NetKubernetes.Domain.Models;
using NetKubernetes.Infraestructure.Authentication;
using NetKubernetes.Infraestructure.Authentication.Token;
using NetKubernetes.Infraestructure.Context;
using NetKubernetes.Infraestructure.Middleware;
using System.Net;

namespace NetKubernetes.Infraestructure.Repositories.Usuarios
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly AppDbContext _dbContext;
        private readonly IUsuarioSession _usuarioSession;

        public UsuarioRepository(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, 
                                IJwtGenerator jwtGenerator, AppDbContext dbContext, IUsuarioSession usuarioSession)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _dbContext = dbContext;
            _usuarioSession = usuarioSession;
        }

        private UsuarioResponseDto TransformerUserToUserDto(Usuario usuario) 
        {
                return new UsuarioResponseDto(){
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Apellido = usuario.Apellido,
                    Telefono = usuario.Telefono,
                    Email = usuario.Email,
                    UserName = usuario.UserName,
                    Token = _jwtGenerator.GenerateToken(usuario)
                };
        }

        public async Task<UsuarioResponseDto> GetUsuario()
        {
            Usuario? user = await _userManager.FindByNameAsync(_usuarioSession.GetUserSession());


            if (user is null)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized,
                                              new { mensaje = "No se encontro el usuario en session en la BD" });
            }

            UsuarioResponseDto responseDto = TransformerUserToUserDto(user!);

            return responseDto;
        }

        public async Task<UsuarioResponseDto> Login(UsuarioLoginRequestDto request)
        {
            Usuario? usuario = await _userManager.FindByEmailAsync(request.Email!);

            if (usuario is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound,
                                              new { mensaje = $"No se encontro el usuario Registrado con el correo: {request.Email}" });
            }

           SignInResult resultado = await _signInManager.CheckPasswordSignInAsync(usuario!, request.Password!, false);

            if (!resultado.Succeeded)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized,
                                              new { mensaje = "Credenciales incorrectas" });
            }
            return TransformerUserToUserDto(usuario!);
        }

        public async Task<UsuarioResponseDto> RegisterUser(UsuarioRegisterDto request)
        {
            Usuario? usuario = await _userManager.FindByEmailAsync(request.Email!);


            if (usuario is not null)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, $"El usuario con el email: {request.Email} ya existe");
            } 
            
            Usuario? usuarioUsername = await _userManager.FindByNameAsync(request.UserName!);


            if (usuarioUsername is not null)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, $"El usuario con el UserName: {request.UserName} ya existe");
            }

            Usuario userCreate = new(){
                Nombre = request.Nombre,
                Apellido = request.Apellido,
                Telefono = request.Telefono,
                Email = request.Email,
                UserName = request.UserName
            };

           IdentityResult resultado =  await _userManager.CreateAsync(usuario!, request.Password!);

            if (!resultado.Succeeded)
            {
                throw new Exception("Fallo en el registro del usuario");
            }

            return TransformerUserToUserDto(userCreate!);
        }
    }
}