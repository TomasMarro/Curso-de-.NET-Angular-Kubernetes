namespace NetKubernetes.Domain.Dtos.Inmueble
{
    public class InmuebleResponseDto
    {
        public int Id { get; set; }

        public string? Nombre { get; set; }

        public string? Direccion { get; set; }

        public decimal Precio { get; set; }

        public string? ImagenUrl { get; set; }

        public DateTime FechaCreacion { get; set; }
    }
}
