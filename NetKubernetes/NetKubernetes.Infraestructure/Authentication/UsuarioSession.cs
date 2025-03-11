using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace NetKubernetes.Infraestructure.Authentication
{
    public class UsuarioSession : IUsuarioSession
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsuarioSession(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserSession()
        {
            string? UserName = _httpContextAccessor.HttpContext!.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return UserName!;
        }
    }
}