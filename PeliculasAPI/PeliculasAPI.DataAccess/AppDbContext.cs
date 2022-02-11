using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DataAccess.Configurations;
using PeliculasAPI.Domain.Models;

namespace PeliculasAPI.DataAccess
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Gender> Genders { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieActor> MovieActors { get; set; }
        public DbSet<MovieGender> MovieGenders { get; set; }
        public DbSet<MovieCinema> MovieCinemas { get; set; }
       
        public DbSet<Rating> Ratings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new GenderConfig().Configure(modelBuilder.Entity<Gender>());
            new ActorConfig().Configure(modelBuilder.Entity<Actor>());
            new CinemaConfig().Configure(modelBuilder.Entity<Cinema>());
            new MovieConfig().Configure(modelBuilder.Entity<Movie>());
            new MovieCinemaConfig().Configure(modelBuilder.Entity<MovieCinema>());
            new MovieActorConfig().Configure(modelBuilder.Entity<MovieActor>());
            new MovieGenderConfig().Configure(modelBuilder.Entity<MovieGender>());
            new RatingConfig().Configure(modelBuilder.Entity<Rating>());
            base.OnModelCreating(modelBuilder);
        }
    }
}
