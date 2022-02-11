using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PeliculasAPI.Application.Dtos.Response;

namespace PeliculasAPI.Shared.Mappings
{
    internal class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<IdentityUser, UserDTO>();
        }
    }
}
