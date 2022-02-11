using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.DataAccess;
using PeliculasAPI.Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PeliculasAPI.Helpers.Extensions;
using PeliculasAPI.Application.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace PeliculasAPI.Controllers
{
    //cambiar desde front para tomer controllerName
    [Route("api/genero")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]

    public class GenderController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GenderController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<GenderDTO>>> Get([FromQuery] PagingDTO paginacionDto)
        {

            var generosqry = _context.Genders.AsQueryable();
            await this.HttpContext.AddPaginParametersInHeader(generosqry);

            var generos = await generosqry.OrderBy(x => x.Name)
                .Paging(paginacionDto).ToListAsync();

            var generosDto = _mapper.Map<List<GenderDTO>>(generos);
            return Ok(generosDto);
        }

        [HttpGet]
        [Route("All")]
        [AllowAnonymous]
        public async Task<ActionResult<List<GenderDTO>>> Get()
        {

            var generosqry = _context.Genders.AsQueryable();
           
            var generos = await generosqry.OrderBy(x => x.Name)
               .ToListAsync();

            var generosDto = _mapper.Map<List<GenderDTO>>(generos);
            return Ok(generosDto);
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<GenderDTO>> GetById(int id)
        {
            var genero = await _context.Genders.FirstOrDefaultAsync(x => x.Id == id);
            if (genero == null) return NotFound();

            var generoDto = _mapper.Map<GenderDTO>(genero);
            return Ok(generoDto );
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenderRequestDTO generodto)
        {
            var genero = _mapper.Map<Gender>(generodto);
            _context.Genders.Add(genero);
            await _context.SaveChangesAsync();
            return Created("api/Generos", genero.Id);
        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromBody] GenderRequestDTO generodto)
        {
            var genero = await _context.Genders.FirstOrDefaultAsync(x => x.Id == id);
            if (genero == null) return NotFound();

            genero = _mapper.Map(generodto, genero);

            await _context.SaveChangesAsync();
            return Ok(genero.Id);
        }



        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existe = await _context.Genders.AnyAsync(x => x.Id == id);
            if (!existe) return NotFound();

           _context.Remove(new Gender() { Id = id });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
