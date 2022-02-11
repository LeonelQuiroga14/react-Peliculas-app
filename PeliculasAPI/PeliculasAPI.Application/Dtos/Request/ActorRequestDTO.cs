using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
namespace PeliculasAPI.Application.Dtos.Request
{
    public class ActorRequestDTO
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime BirthDate { get; set; }
        
        public IFormFile Photo { get; set; }
    
    }
}
