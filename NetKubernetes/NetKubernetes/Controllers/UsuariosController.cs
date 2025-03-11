
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetKubernetes.Domain.Dtos.Usuario;
using NetKubernetes.Infraestructure.Repositories.Usuarios;

namespace NetKubernetes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
         private readonly ILogger<InmueblesController> _logger;
        private readonly IUsuarioRepository _usuarioRepository;
        public UsuariosController(ILogger<InmueblesController> logger, IUsuarioRepository usuarioRepository)
        {
            _logger = logger;
            _usuarioRepository = usuarioRepository;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioResponseDto>> Login
        (
            [FromBody] UsuarioLoginRequestDto request
        )
        {
            UsuarioResponseDto response = await _usuarioRepository.Login(request);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UsuarioResponseDto>> Register
        (
            [FromBody] UsuarioRegisterDto request
        )
        {
            UsuarioResponseDto response = await _usuarioRepository.RegisterUser(request);
            return response;
        }

        [HttpGet("getUserSession")]
        public async Task<ActionResult<UsuarioResponseDto>> GetUserSession
        (
        )
         {
            UsuarioResponseDto response = await _usuarioRepository.GetUsuario();
            return response;
        }
    }
}