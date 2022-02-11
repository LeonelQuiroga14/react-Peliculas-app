using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class RatingConfig : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {

            builder.ToTable("Rating");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Score).HasMaxLength(maxLength: 5);
        
             builder.HasOne(x=> x.Movie)
                .WithMany(x=> x.Ratings)
                .HasForeignKey(x=> x.MovieId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
