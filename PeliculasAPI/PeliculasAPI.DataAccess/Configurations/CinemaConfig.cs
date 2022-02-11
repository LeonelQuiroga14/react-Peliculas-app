using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class CinemaConfig : IEntityTypeConfiguration<Cinema>
    {
        public void Configure(EntityTypeBuilder<Cinema> builder)
        {
            builder.ToTable("Cinema");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Name).HasColumnType("nvarchar")
                .HasMaxLength(200).IsRequired(true);

        }
    }
}
