using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Application.Extensions;
using PeliculasAPI.Application.Interfaces.Services;
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
    public class ActorController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileManager _fileManager;
        private readonly string blobContainer = "actores";
        public ActorController(AppDbContext context, IMapper mapper, IFileManager fileManager)
        {
            _context = context;
            _mapper = mapper;
            _fileManager = fileManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorDTO>>> GetActors([FromQuery] PagingDTO paging)
        {

            var actorQry = _context.Actors.AsQueryable();
            await HttpContext.AddPaginParametersInHeader(actorQry);
            var actors = await actorQry.OrderBy(x => x.Name).Paging(paging).ToListAsync();
            var actorsDto = _mapper.Map<List<ActorDTO>>(actors);
            return Ok(actorsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<ActorDTO>> GetActor(int id)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }
            var actorDto = _mapper.Map<ActorDTO>(actor);

            return Ok(actorDto);
        }




        [HttpGet]
        [Route("Search/ByName/{query}")]
        public async Task<ActionResult<List<MovieActorDTO>>> GetByName(string query = "")
        {
            if (string.IsNullOrWhiteSpace(query)) return new List<MovieActorDTO>();
            var result = await _context.Actors.Where(x => x.Name.Contains(query)).OrderBy(x => x.Name).Select(x => new MovieActorDTO
            {
                Id = x.Id,
                Name = x.Name,
                Photo = x.Photo
            }).Take(5).ToListAsync();

            return result;
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> PutActor(int id, [FromForm] ActorRequestDTO actordto)
        {
            if (id == 0) return BadRequest();

            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null) return NotFound();

            actor = _mapper.Map(actordto, actor);


            if (actordto.Photo != null)
            {

                actor.Photo = await _fileManager.UpdateFile(blobContainer, actor.Photo, actordto.Photo);
            }
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpPost]
        public async Task<ActionResult> PostActor([FromForm] ActorRequestDTO actordto)
        {
            var actor = _mapper.Map<Actor>(actordto);

            if (actordto.Photo != null)
            {
                actor.Photo = await _fileManager.SaveFile(blobContainer, actordto.Photo);
            }


            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();

            return Created("api/Actor", actor.Id);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            if (id == 0) return BadRequest();
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null) return NotFound();
            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();
            await _fileManager.DeleteFile(actor.Photo, blobContainer);
            return Ok();

        }


    }
}
