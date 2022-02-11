using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;
using System;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class MovieGenderConfig : IEntityTypeConfiguration<MovieGender>
    {
        public void Configure(EntityTypeBuilder<MovieGender> builder)
        {
            builder.ToTable("MovieGender");
            builder.HasKey(t => new {t.MovieId,t.GenderId});
           
        }
    }
}
