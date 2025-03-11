
using NetKubernetes.Domain.Dtos.Usuario;

namespace NetKubernetes.Infraestructure.Repositories.Usuarios
{
    public interface IUsuarioRepository
    {
        Task<UsuarioResponseDto> GetUsuario();

        Task<UsuarioResponseDto> Login(UsuarioLoginRequestDto request);

        Task<UsuarioResponseDto> RegisterUser(UsuarioRegisterDto request);

    }
}