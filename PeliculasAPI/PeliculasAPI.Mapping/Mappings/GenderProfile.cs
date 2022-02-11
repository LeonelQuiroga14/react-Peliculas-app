using AutoMapper;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Domain.Models;

namespace PeliculasAPI.Shared.Mappings
{
    public class GenderProfile:Profile
    {
        public GenderProfile()
        {
            CreateMap<Gender, GenderDTO>();
            CreateMap<GenderRequestDTO, Gender>();

        }
    }
}
