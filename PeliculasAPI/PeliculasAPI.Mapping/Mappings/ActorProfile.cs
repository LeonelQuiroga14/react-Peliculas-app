using AutoMapper;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Domain.Models;

namespace PeliculasAPI.Shared.Mappings
{
    public class ActorProfile:Profile
    {
        public ActorProfile()
        {
        CreateMap<Actor, ActorDTO>();
        CreateMap<ActorRequestDTO, Actor>()
        .ForMember(dest => dest.Photo, opt => opt.Ignore());
               

        }
    }
}
