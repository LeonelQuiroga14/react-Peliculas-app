using PeliculasAPI.Domain.Validations;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Application.Dtos.Request
{
    public class GenderRequestDTO
    {
        [Required]
        [FirsLetterUpperCase]
        public string Name { get; set; }
    }
}
