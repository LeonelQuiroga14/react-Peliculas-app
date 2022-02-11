using AutoMapper;
using PeliculasAPI.Application.Dtos.Request;
using PeliculasAPI.Application.Dtos.Response;
using PeliculasAPI.Domain.Models;
using System;
using System.Collections.Generic;

namespace PeliculasAPI.Shared.Mappings
{
    internal class MovieProfile:Profile
    {

        public MovieProfile()
        {
            CreateMap<MovieRequestDTO, Movie>()
                .ForMember(x => x.Poster, opt => opt.Ignore())
                .ForMember(x => x.MovieGenders, opt => opt.MapFrom(MapMovieGenders))
                .ForMember(x => x.MovieCinemas, opt => opt.MapFrom(MapMovieCinemas))
                 .ForMember(x => x.MovieActors, opt => opt.MapFrom(MapMovieActors));


            CreateMap<Movie, MovieDTO>()
                .ForMember(x => x.Genders, opt => opt.MapFrom(MapGenders))
                 .ForMember(x => x.Actors, opt => opt.MapFrom(MapActors))
                  .ForMember(x => x.Cinemas, opt => opt.MapFrom(MapCinemas));

        }

        private List<CinemaDTO> MapCinemas(Movie movie, MovieDTO moviedto)
        {
            var cinemas = new List<CinemaDTO>();

            if (movie.MovieCinemas != null)
            {
                foreach (var item in movie.MovieCinemas)
                {
                    cinemas.Add(new()
                    {
                        Id = item.CinemaId,
                        Name = item.Cinema.Name,
                        Latitude = item.Cinema.Location.Y,
                        Longitude = item.Cinema.Location.X

                    });
                }
            }

            return cinemas;
        }

        private List<MovieActorDTO> MapActors(Movie movie, MovieDTO moviedto)
        {
            var actors = new List<MovieActorDTO>();

            if (movie.MovieGenders != null)
            {
                foreach (var item in movie.MovieActors)
                {
                    actors.Add(new()
                    {
                        Id = item.ActorId,
                        Character = item.Character,
                        Order= item.Order,
                        Photo= item.Actor.Photo,
                        Name = item.Actor.Name
                        

                    });
                }
            }

            return actors;
        }

        private List<GenderDTO> MapGenders(Movie movie, MovieDTO moviedto)
        {
            var genders = new List<GenderDTO>();
         
            if(movie.MovieGenders != null)
            {
                foreach (var item in movie.MovieGenders)
                {
                    genders.Add(new()
                    {
                        Id= item.GenderId,
                        Name = item.Gender.Name

                    });
                }
            }

            return genders;
        }

        private List<MovieActor> MapMovieActors(MovieRequestDTO movieRequest,Movie movie)
        {
            var result = new List<MovieActor>();
            if (movieRequest.Actors == null || movieRequest.Actors.Count == 0)
                return result;

            movieRequest.Actors.ForEach(x =>
            {

                result.Add(new MovieActor { 
                    ActorId = x.Id,
                    Character = x.Character
                });
            });

            return result;
        }

        private List<MovieGender> MapMovieGenders(MovieRequestDTO movieRequest,Movie movie)
        {
            var result = new List<MovieGender>();
            if (movieRequest.GenderIds == null || movieRequest.GenderIds.Count == 0 )
                return result;

            movieRequest.GenderIds.ForEach(x =>
            {

                result.Add(new MovieGender { GenderId = x });
            });

            return result;

        }

        private List<MovieCinema> MapMovieCinemas(MovieRequestDTO movieRequest, Movie movie)
        {
            var result = new List<MovieCinema>();
            if (movieRequest.CinemaIds == null || movieRequest.CinemaIds.Count == 0)
                return result;

            movieRequest.CinemaIds.ForEach(x =>
            {

                result.Add(new MovieCinema { CinemaId = x });
            });

            return result;

        }
    }
}
