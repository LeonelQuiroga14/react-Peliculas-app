using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PeliculasAPI.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliculasAPI.DataAccess.Configurations
{
    internal class ActorConfig : IEntityTypeConfiguration<Actor>
    {
        public void Configure(EntityTypeBuilder<Actor> builder)
        {
            builder.ToTable("Actor");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Name).HasColumnType("nvarchar")
                .HasMaxLength(200).IsRequired(true);

        }
    }
}
