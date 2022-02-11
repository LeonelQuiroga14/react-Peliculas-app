using System;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Application.Dtos.Request
{
    public class RatingRequestDTO
    {
        [Range(1,5)]
        public int Score { get; set; }
        public int MovieId { get; set; }
    }
}
