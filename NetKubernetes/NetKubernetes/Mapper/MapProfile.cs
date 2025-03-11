
using AutoMapper;
using NetKubernetes.Domain.Dtos.Inmueble;
using NetKubernetes.Domain.Dtos.Usuario;
using NetKubernetes.Domain.Models;

namespace NetKubernetes.Mapper
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Inmueble, InmuebleResponseDto>().ReverseMap();
            CreateMap<InmuebleResponseDto, Inmueble>();
            CreateMap<Usuario, UsuarioResponseDto>();
            CreateMap<UsuarioResponseDto, Usuario>();
        }

    }
}