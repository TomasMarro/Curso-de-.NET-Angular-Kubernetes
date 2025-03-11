
using NetKubernetes.Domain.Models;

namespace NetKubernetes.Infraestructure.Authentication.Token
{
    public interface IJwtGenerator
    {
        string GenerateToken(Usuario usuario);
    }
}