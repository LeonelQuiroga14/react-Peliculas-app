using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Application.Extensions;
using PeliculasAPI.DataAccess;
using PeliculasAPI.Domain.Models;
using PeliculasAPI.Helpers.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]

    public class CinemaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CinemaController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<ActionResult<List<CinemaDTO>>> Get([FromQuery] PagingDTO paginacionDto)
        {

            var cinemaQry = _context.Cinemas.AsQueryable();
            await this.HttpContext.AddPaginParametersInHeader(cinemaQry);

            var cinemas = await cinemaQry.OrderBy(x => x.Name)
                .Paging(paginacionDto).ToListAsync();

            var cinemasDtos = _mapper.Map<List<CinemaDTO>>(cinemas);
            return Ok(cinemasDtos);
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<CinemaDTO>> GetById(int id)
        {
            var cinema = await _context.Cinemas.FirstOrDefaultAsync(x => x.Id == id);
            if (cinema == null) return NotFound();

            var cinemadto = _mapper.Map<CinemaDTO>(cinema);
            return Ok(cinemadto);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CinemaRequestDTO cinedto)
        {
            var cine = _mapper.Map<Cinema>(cinedto);
            _context.Cinemas.Add(cine);
            await _context.SaveChangesAsync();
            return Created("api/Cinema", cine.Id);
        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CinemaRequestDTO cinemdto)
        {
            var cinema = await _context.Cinemas.FirstOrDefaultAsync(x => x.Id == id);
            if (cinema == null) return NotFound();

            cinema = _mapper.Map(cinemdto, cinema);

            await _context.SaveChangesAsync();
            return Ok(cinema.Id);
        }



        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existe = await _context.Cinemas.AnyAsync(x => x.Id == id);
            if (!existe) return NotFound();

            _context.Remove(new Cinema() { Id = id });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
