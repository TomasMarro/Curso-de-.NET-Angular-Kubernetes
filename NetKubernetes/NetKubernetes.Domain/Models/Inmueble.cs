
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetKubernetes.Domain.Models
{
    public class Inmueble
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public string? Nombre { get; set; }

        public string? Direccion { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }

        public string? UrlImagen { get; set; }

        public DateTime FechaCreacion { get; set; }

        public Guid? UsuarioId { get; set; }

    }
}