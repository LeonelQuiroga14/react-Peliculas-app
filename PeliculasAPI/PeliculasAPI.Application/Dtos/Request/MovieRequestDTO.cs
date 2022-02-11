using Microsoft.AspNetCore.Http;
using PeliculasAPI.Application.Helpers.Binders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PeliculasAPI.Application.Dtos.Request
{
    public class MovieRequestDTO
    {
        [Required]
        public string Title { get; set; }
        public string Resume { get; set; }
        public string Trailer { get; set; }

        public bool InCinema { get; set; }

        public DateTime PremiereDate { get; set; }
        public IFormFile Poster { get; set; }
        
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenderIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CinemaIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<MovieActorRequestDTO>>))]
        public List<MovieActorRequestDTO> Actors { get; set; }
    }
}
