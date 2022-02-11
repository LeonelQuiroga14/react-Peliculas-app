using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class GenderConfig : IEntityTypeConfiguration<Gender>
    {
        public void Configure(EntityTypeBuilder<Gender> builder)
        {
            builder.ToTable("Gender");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Name).HasColumnType("nvarchar")
                .HasMaxLength(100).IsRequired(true);

        }
    }
}
