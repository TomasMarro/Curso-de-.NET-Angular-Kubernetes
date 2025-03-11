
using Microsoft.AspNetCore.Identity;
using NetKubernetes.Domain.Models;
using NetKubernetes.Infraestructure.Context;
using System.Text.Json;

namespace NetKubernetes.Data
{
    public class LoadDatabase
    {

        public static async Task InsertData(AppDbContext dbContext, UserManager<Usuario> userManager)
        {
            if (!dbContext.Inmuebles.Any())
            {
                IEnumerable<Inmueble> inmuebles = new List<Inmueble>
                {
                    new Inmueble
                    {
                        Direccion = "Calle 123",
                        Nombre = "Sitio Baldio",
                        Precio = 1000000,
                        FechaCreacion = DateTime.Now,

                    },
                    new Inmueble
                    {
                        Nombre = "Casa de la esquina",
                        Direccion = "Calle 456",
                        FechaCreacion = DateTime.Now,
                        Precio = 2000000,
                    },
                    new Inmueble
                    {
                        Nombre = "Casa de la playa",
                        Direccion = "Calle roca 453",
                        FechaCreacion = DateTime.Now,
                        Precio = 4000000,
                    },
                    new Inmueble
                    {
                        Nombre = "Casa de la niveve",
                        Direccion = "Calle lincond",
                        FechaCreacion = DateTime.Now,
                        Precio = 7000000,
                    },
                    new Inmueble
                    {
                        Nombre = "Casa de la montaña",
                        Direccion = "everest 5000",
                        FechaCreacion = DateTime.Now,
                        Precio = 8000000,
                    }
                };    

                dbContext.Inmuebles!.AddRange(inmuebles);

                await dbContext.SaveChangesAsync();
            }

            if (!userManager.Users.Any())
            {
                Usuario usuario1 = new()
                {
                    Nombre = "Juan",
                    Apellido = "Perez",
                    Email = "juanperez@hotmail.com",
                    UserName = "juanperez",
                    Telefono = "123456789",
                };

                Usuario usuario2 = new()
                {
                    Nombre = "Jose",
                    Apellido = "Perez",
                    Email = "joseperez@hotmail.com",
                    UserName = "joseperez",
                    Telefono = "987654321",
                };

                await userManager.CreateAsync(usuario1, "Password12345*");
                await userManager.CreateAsync(usuario2, "Password12345*");
            }

        }

    }
}