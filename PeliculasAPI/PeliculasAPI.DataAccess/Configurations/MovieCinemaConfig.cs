using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;
using System;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class MovieCinemaConfig : IEntityTypeConfiguration<MovieCinema>
    {
        public void Configure(EntityTypeBuilder<MovieCinema> builder)
        {
            builder.ToTable("MovieCinema");
            builder.HasKey(t => new {t.MovieId,t.CinemaId});
          
        }
    }
}
