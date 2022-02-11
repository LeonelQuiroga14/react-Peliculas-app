using PeliculasAPI.Domain.Validations;
using System.Collections.Generic;

namespace PeliculasAPI.Domain.Models
{
    public class Gender:BaseEntity
    {
        public Gender()
        {
            MovieGenders = new();
        }

        [FirsLetterUpperCase]
        public string Name { get; set; }
        public List<MovieGender> MovieGenders { get; set; }

    }
}
