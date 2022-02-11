using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Application.Dtos.Request
{
    public  class CinemaRequestDTO
    {
        [Required]
        [StringLength(maximumLength:100)]
        public string Name { get; set; }
        [Range(-90,90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]

        public double Longitude { get; set; }
    }
}
