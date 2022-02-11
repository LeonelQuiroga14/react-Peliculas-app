using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;
using System;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class MovieActorConfig : IEntityTypeConfiguration<MovieActor>
    {
        public void Configure(EntityTypeBuilder<MovieActor> builder)
        {
            builder.ToTable("MovieActor");
            builder.HasKey(t =>  new { t.ActorId, t.MovieId });
        }
    }
}
