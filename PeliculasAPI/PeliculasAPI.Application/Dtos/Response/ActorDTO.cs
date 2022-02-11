using System;

namespace PeliculasAPI.Application.Dtos.Response
{
    public class ActorDTO:BaseDTO
    {
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime BirthDate { get; set; }
        public string Photo { get; set; }
    }
}
