using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace NetKubernetes.Domain.Models
{
    public class Usuario : IdentityUser
    {
        public string? Nombre { get; set; }

        public string? Apellido { get; set; }

        public string? Telefono { get; set; }
    }
}