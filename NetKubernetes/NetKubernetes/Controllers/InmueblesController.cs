
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NetKubernetes.Domain.Dtos.Inmueble;
using NetKubernetes.Domain.Models;
using NetKubernetes.Infraestructure.Middleware;
using NetKubernetes.Infraestructure.Repositories.Inmuebles;
using System.Net;
using System.Threading.Tasks;

namespace NetKubernetes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InmueblesController : ControllerBase
    {
        private readonly IInmueblesRepository _inmueblesRepository;

        private readonly IMapper _mapper;

        public InmueblesController(IInmueblesRepository inmueblesRepository, IMapper mapper)
        {
            _inmueblesRepository = inmueblesRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<InmuebleResponseDto>>> GetAllInmuebles()
        {
            IEnumerable<Inmueble> inmuebles = await _inmueblesRepository.GetAllInmuebles();

            IEnumerable<InmuebleResponseDto> inmueblesResponse = _mapper.Map<IEnumerable<InmuebleResponseDto>>(inmuebles);

            return Ok(inmueblesResponse);
        }


        [HttpGet("{id}" , Name = "GetInmuebleById") ]
        public async Task<ActionResult<IEnumerable<InmuebleResponseDto>>> GetInmuebleById(int id)
        {
            Inmueble? inmueble = await _inmueblesRepository.GetInmuebleById(id);

            if (inmueble is null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound, $"No se ha encontrado el inmueble con el id: {id}");
            }

            InmuebleResponseDto inmuebleResponse = _mapper.Map<InmuebleResponseDto>(inmueble);

            return Ok(inmuebleResponse);
        }


        [HttpPost]
        public async Task<ActionResult<InmuebleResponseDto>> CreateInmuebleAsync
        (
            [FromBody] InmuebleRequestDto inmuebleRequest
        )
        {
            Inmueble inmueble = _mapper.Map<Inmueble>(inmuebleRequest);

            int inmuebleId = await _inmueblesRepository.CreateInmueble(inmueble);
            
            
            bool resultado = await _inmueblesRepository.SaveChangesAsync();

            if (!resultado)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, "Error en el registro del inmueble");
            }
            
            InmuebleResponseDto inmuebleResponse = _mapper.Map<InmuebleResponseDto>(inmueble);

            return CreatedAtRoute(nameof(GetInmuebleById), new { id = inmuebleId }, inmuebleResponse);
        }


        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteInmueble(int id)
        {
            await _inmueblesRepository.DeleteInmueble(id);
            bool resultado = await _inmueblesRepository.SaveChangesAsync();

            if (!resultado)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, "Error en la eliminacion del inmueble");
            }

            return Ok();
        }
    }
}