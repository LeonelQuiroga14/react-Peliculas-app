using AutoMapper;
using NetTopologySuite.Geometries;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliculasAPI.Shared.Mappings
{
    internal class CinemaProfile : Profile
    {

        public CinemaProfile()
        {
            CreateMap<CinemaRequestDTO, Cinema>();
            CreateMap<Cinema, CinemaDTO>();
        }

        public CinemaProfile(GeometryFactory geometryFactory)
        {
            CreateMap<CinemaRequestDTO, Cinema>()
                .ForMember(dest => dest.Location, x => x.MapFrom(dto =>
                 geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))
                ));
            CreateMap<Cinema, CinemaDTO>()
                  .ForMember(dest => dest.Latitude, x => x.MapFrom(dto => dto.Location.Y))
                  .ForMember(dest => dest.Longitude, x => x.MapFrom(dto => dto.Location.X));
    
        }
    }
}
