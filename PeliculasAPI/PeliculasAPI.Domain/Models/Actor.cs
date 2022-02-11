using System;
using System.Collections.Generic;

namespace PeliculasAPI.Domain.Models
{
    public class Actor : BaseEntity
    {

        public Actor()
        {
            MovieActors = new();
        }
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime BirthDate { get; set; }
        public string Photo { get; set; }
        public List<MovieActor> MovieActors { get; set; }
    } 
}
