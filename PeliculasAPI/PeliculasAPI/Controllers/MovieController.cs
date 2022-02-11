using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Application.Extensions;
using PeliculasAPI.Helpers.Extensions ;
using PeliculasAPI.Application.Interfaces.Services;
using PeliculasAPI.DataAccess;
using PeliculasAPI.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace PeliculasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize (AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy ="Admin")]

    public class MovieController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileManager _fileManager;
        private readonly UserManager<IdentityUser> _userManager;
        private const string MovieContainer = "Movies";
        public MovieController(AppDbContext context,IMapper mapper,IFileManager fileManager,UserManager<IdentityUser> um)
        {
            _context = context;
            _mapper = mapper;
            _fileManager = fileManager;
            _userManager = um;

        }

        [HttpGet]
        [Route("PostGet")]
        public async Task<ActionResult> PostGet()
        {
            var cinemas = await _context.Cinemas.ToListAsync();
            var genders = await _context.Genders.ToListAsync();

            var cinemasDto = _mapper.Map<List<CinemaDTO>>(cinemas);
            var gendersDto = _mapper.Map<List<GenderDTO>>(genders);

            return Ok(new MoviePostGetDTO(genders: gendersDto, cinemas: cinemasDto));

        }


        [HttpGet]
        [Route("PutGet/{id:int}")]
        public async Task<ActionResult<MoviePutGetDTO>> PutGet(int id)
        {
          var movieActionResult = await GetDetail(id);
            if(movieActionResult.Result is NotFoundResult)
            {
                return NotFound();
            }
            var movie = movieActionResult.Value;

            var selectedGenders = movie.Genders.Select(x => x.Id).ToList();

            var unSelectedGenders = await _context.Genders.Where(x=> !selectedGenders.Contains(x.Id)).ToListAsync();

            var selectedCinemas = movie.Cinemas.Select(x => x.Id).ToList();

            var unSelectedCinemas = await _context.Cinemas.Where(x => !selectedCinemas.Contains(x.Id)).ToListAsync();

            MoviePutGetDTO result = new();
            result.SelectedGenders = movie.Genders;
            result.UnSelectedGenders = _mapper.Map<List<GenderDTO>>(unSelectedGenders);
            result.Movie = movie;
            result.SelectedCinemas = movie.Cinemas;
            result.UnSelectedCinemas = _mapper.Map<List<CinemaDTO>>(unSelectedCinemas);
            result.Actors = movie.Actors;

            return result;
        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromForm] MovieRequestDTO movieRequest)
        {

            var movieBd = await _context.Movies
                .Include(x=> x.MovieCinemas)
                .Include(x => x.MovieActors)
                .Include(x => x.MovieGenders)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movieBd == null) return NotFound();

            movieBd = _mapper.Map(movieRequest, movieBd);
            
            if(movieRequest.Poster != null)
            {
                movieBd.Poster = await _fileManager.UpdateFile(MovieContainer, movieBd.Poster, movieRequest.Poster);
                
            }
            SetOrderActors(movieBd);
            await _context.SaveChangesAsync();
            return Ok();

        }


        [HttpGet]
        [Route("Detail/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<MovieDTO>>GetDetail(int id)
        {
            var movie = await _context.Movies
                .Include(x => x.MovieGenders).ThenInclude(x => x.Gender)
                  .Include(x => x.MovieActors).ThenInclude(x => x.Actor)
                  .Include(x => x.MovieCinemas).ThenInclude(x => x.Cinema)
                  .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null) return NotFound();

            var avgVotes = 0.0;
            var userVote = 0;

            if(await _context.Ratings.AnyAsync(x=> x.MovieId == id))
            {
                avgVotes = await _context.Ratings.Where(x => x.MovieId == id).AverageAsync(x => x.Score);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await _userManager.FindByEmailAsync(email);
                    var userId = user.Id;

                    var ratingDb = await _context.Ratings.FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == id);
                    if(ratingDb != null)
                    {
                        userVote = ratingDb.Score;
                    }
                }

            }

            var dto = _mapper.Map<MovieDTO>(movie);
            dto.AverageVotes = avgVotes;
            dto.UserVote = userVote;

            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();

            return dto;
        }

        [HttpPost]
        public async Task<ActionResult> PostMovie([FromForm] MovieRequestDTO movieRequest)
        {
            var movie = _mapper.Map<Movie>(movieRequest);

            if (movieRequest.Poster != null)
            {
                movie.Poster = await _fileManager.SaveFile(MovieContainer, movieRequest.Poster);
            }
            SetOrderActors(movie);

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return Created("api/Movie", movie.Id);
        }



        [HttpGet]
        [Route("Landing")]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> GetMovie()
        {
            int top = 6;
            DateTime today = DateTime.Today;

            var nextReleases = await _context.Movies.Where(
                x => x.PremiereDate > today)
                .OrderBy(x => x.PremiereDate)
                .Take(top).ToListAsync();

            var inCinemas = await _context.Movies.Where(
              x => x.InCinema)
              .OrderBy(x => x.PremiereDate)
              .Take(top).ToListAsync();

            LandingPageDTO result = new();
            result.NextReleases = _mapper.Map<List<MovieDTO>>(nextReleases);
            result.InCinemas = _mapper.Map<List<MovieDTO>>(inCinemas);


            return Ok(result);

        }



        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            _context.Remove(movie);
            await _context.SaveChangesAsync();
            await _fileManager.DeleteFile(movie.Poster, MovieContainer);
            return Ok();
        }


        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<MovieDTO>>> Filtrar([FromQuery] MovieFilterRequestDTO movieFilterDto)
        {
            var movieQry = _context.Movies.AsQueryable();

            if (!string.IsNullOrEmpty(movieFilterDto.Title))
            {
                movieQry = movieQry.Where(x => x.Title.Contains(movieFilterDto.Title));
            }

            if (movieFilterDto.InCinema)
            {
                movieQry = movieQry.Where(x => x.InCinema);
            }

            if (movieFilterDto.NextReleases)
            {
                var hoy = DateTime.Today;
                movieQry = movieQry.Where(x => x.PremiereDate > hoy);
            }

            if (movieFilterDto.GenderId != 0)
            {
                movieQry = movieQry
                    .Where(x => x.MovieGenders.Select(y => y.GenderId)
                    .Contains(movieFilterDto.GenderId));
            }

            await HttpContext.AddPaginParametersInHeader(movieQry);

            var peliculas = await movieQry.Paging(movieFilterDto.Paging).ToListAsync();
            return _mapper.Map<List<MovieDTO>>(peliculas);
        }
        private void SetOrderActors (Movie movie)
        {
            if (movie.MovieActors == null)
            {
                for (int i = 0; i < movie.MovieActors.Count; i++)
                {
                    movie.MovieActors[i].Order = i;
                }
            }
        }
        
       
    }
}
