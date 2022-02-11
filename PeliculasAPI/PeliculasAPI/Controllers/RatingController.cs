using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.DataAccess;
using PeliculasAPI.Domain.Models;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AppDbContext _context { get; }

        public RatingController(UserManager<IdentityUser> userManager,AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody]RatingRequestDTO ratingRequest)
        {
            string email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email")?.Value;
            var user = await _userManager.FindByEmailAsync(email); 
            var userId = user.Id;

            var currentRating = await _context.Ratings
             .FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == ratingRequest.MovieId);
           
            if (currentRating == null)
            {
                Rating rating = new()
                {
                    UserId = userId,
                    MovieId = ratingRequest.MovieId,
                    Score = ratingRequest.Score,
                };
                _context.Ratings.Add(rating);
            }
            else
            {
                currentRating.Score = ratingRequest.Score;
            }
                await _context.SaveChangesAsync();
            
            return Ok();
        }
    }
}
