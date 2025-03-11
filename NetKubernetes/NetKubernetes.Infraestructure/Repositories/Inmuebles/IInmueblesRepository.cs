
using NetKubernetes.Domain.Models;
using System.Threading.Tasks;

namespace NetKubernetes.Infraestructure.Repositories.Inmuebles
{
    public interface IInmueblesRepository
    {
        Task<bool> SaveChangesAsync();

        Task<IEnumerable<Inmueble>> GetAllInmuebles();

        Task<Inmueble?> GetInmuebleById(int id);

        Task<int> CreateInmueble(Inmueble inmueble);

        int UpdateInmueble(Inmueble inmueble);

        Task DeleteInmueble(int id);
    }
}