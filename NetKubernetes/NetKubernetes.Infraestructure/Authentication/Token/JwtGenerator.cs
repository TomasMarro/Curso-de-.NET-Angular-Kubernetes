

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using NetKubernetes.Domain.Models;

namespace NetKubernetes.Infraestructure.Authentication.Token
{
    public class JwtGenerator : IJwtGenerator
    {
        public string GenerateToken(Usuario usuario)
        {
            List<Claim> claims = new(){
                new Claim(JwtRegisteredClaimNames.NameId, usuario.UserName!.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email!.ToString()),
            };

            SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes("Mipalabrasecretaesmuycortaparaserclavesecretaperolapongoigualporlasdudas"));
            
            SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new(){
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}