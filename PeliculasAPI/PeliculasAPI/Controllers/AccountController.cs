using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.DataAccess;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using PeliculasAPI.Helpers.Extensions;
using PeliculasAPI.Application.Extensions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace PeliculasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AccountController(UserManager<IdentityUser> userManager,IConfiguration configuration,SignInManager<IdentityUser> signInManager,AppDbContext context,IMapper mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
            _signInManager = signInManager;
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("User/List")]

        public async Task<ActionResult<List<UserDTO>>> GetUsers([FromQuery] PagingDTO paging)
        {

            IQueryable<IdentityUser> query = _context.Users;
            await HttpContext.AddPaginParametersInHeader(query);
            var users = await query.OrderBy(x => x.Email).Paging(paging).ToListAsync();
            var userDto = _mapper.Map<List<UserDTO>>(users);
            return Ok(userDto);
        }


        [HttpPost]
        [Route("User/Permission/Admin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]

        public async Task<ActionResult> AddPermission([FromBody] string userId)
        {
           var user = await _userManager.FindByIdAsync(userId);
            await _userManager.AddClaimAsync(user, new Claim("role", "Admin"));
            return Ok();

        }


        [HttpDelete]
        [Route("User/Permission/Admin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]

        public async Task<ActionResult> RemoveAdmin([FromBody]string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.RemoveClaimAsync(user, new Claim("role", "Admin"));
            return Ok();

        }




        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<AuthenticationResultDTO>>Create([FromBody] UserCredentialRequestDTO credentials)
        {
            IdentityUser user = new()
            {
                UserName = credentials.Email,
                Email = credentials.Email

            };

            var result = await _userManager.CreateAsync(user, credentials.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return await CreateToken(credentials);


        }


        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<AuthenticationResultDTO>> Login([FromBody] UserCredentialRequestDTO credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, isPersistent:false,lockoutOnFailure:false);
            if (!result.Succeeded) return BadRequest("Login failed");

            return await CreateToken(credentials);

        }

        private async Task<AuthenticationResultDTO>CreateToken(UserCredentialRequestDTO credentials)
        {
            List<Claim> claims = new()
            {
            new Claim("email",credentials.Email),
            new Claim("userName", credentials.Email)

            };

            var user = await _userManager.FindByEmailAsync(credentials.Email);
            var claimsDb = await _userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDb);


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwtKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.Now.AddYears(1);
            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: cred);
            return new AuthenticationResultDTO
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpirationDate = expiration,

            };
        }


    }
}
