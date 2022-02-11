using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;
using System;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class MovieConfig : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder.ToTable("Movie");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Title).HasColumnType("nvarchar")
                .HasMaxLength(300).IsRequired(true);

            builder.Property(t => t.Resume).HasColumnType("nvarchar")
                .HasMaxLength(1000).IsRequired(true);

            builder.Property(t => t.Trailer).HasColumnType("nvarchar").HasMaxLength(1000);

            builder.Property(t => t.InCinema).HasColumnType("bit")
                .HasDefaultValue(false);
        }
    }
}
