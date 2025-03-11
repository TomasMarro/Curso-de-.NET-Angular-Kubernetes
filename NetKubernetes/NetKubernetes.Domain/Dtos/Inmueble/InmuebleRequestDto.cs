namespace NetKubernetes.Domain.Dtos.Inmueble
{
    public class InmuebleRequestDto
    {
        public string? Nombre { get; set; }

        public string? Direccion { get; set; }

        public decimal Precio { get; set; }

        public string? ImagenUrl { get; set; }
    }
}
