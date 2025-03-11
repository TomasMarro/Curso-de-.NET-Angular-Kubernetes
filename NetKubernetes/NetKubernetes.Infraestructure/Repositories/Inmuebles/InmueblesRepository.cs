

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NetKubernetes.Domain.Models;
using NetKubernetes.Infraestructure.Authentication;
using NetKubernetes.Infraestructure.Context;
using NetKubernetes.Infraestructure.Middleware;
using System.Net;

namespace NetKubernetes.Infraestructure.Repositories.Inmuebles
{
    public class InmueblesRepository : IInmueblesRepository
    {
        private readonly AppDbContext _context;
        private readonly IUsuarioSession _usuarioSession;

        private readonly UserManager<Usuario> _userManager;
        public InmueblesRepository(AppDbContext context, IUsuarioSession usuarioSession, UserManager<Usuario> userManager)
        {
            _context = context;
            _usuarioSession = usuarioSession;
            _userManager = userManager;
        }

        public async Task<int> CreateInmueble(Inmueble inmueble)
        {
            Usuario? user = await _userManager.FindByNameAsync(_usuarioSession.GetUserSession());

            if (user == null)
            {
                throw new MiddlewareException(HttpStatusCode.Unauthorized, "El usuario no tiene los permisos para la insercion");
            }

            if (inmueble == null)
            {
                throw new MiddlewareException(System.Net.HttpStatusCode.BadRequest, "Los datos del inmueble son incorrectos");
            }

            inmueble.FechaCreacion = DateTime.Now;
            inmueble.UsuarioId = Guid.Parse(user.Id);

            await _context.Inmuebles.AddAsync(inmueble);
            await SaveChangesAsync();

            return inmueble.Id;
        }

        public async Task DeleteInmueble(int id)
        {
            Inmueble? inmueble = await  _context.Inmuebles.FirstOrDefaultAsync(x => x.Id == id);

            if (inmueble == null) 
            {
                throw new MiddlewareException(HttpStatusCode.NotFound, $"Inmueble con el id: {id} a eliminar no encontrado");
            }

            _context.Inmuebles!.Remove(inmueble);
            await SaveChangesAsync();
        }

        public async Task<IEnumerable<Inmueble>> GetAllInmuebles()
        {
            return await _context.Inmuebles.ToListAsync();
        }

        public async Task<Inmueble?> GetInmuebleById(int id)
        {
            return await _context.Inmuebles!.FirstOrDefaultAsync(x => x.Id == id)!;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public int UpdateInmueble(Inmueble inmueble)
        {
            throw new NotImplementedException();
        }
    }
}