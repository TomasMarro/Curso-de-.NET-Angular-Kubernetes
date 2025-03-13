using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NetKubernetes.Domain.Models;

namespace NetKubernetes.Infraestructure.Context
{
    public class AppDbContext : IdentityDbContext<Usuario>
    {
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Inmueble> Inmuebles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Usuario>().Property(u => u.Id).HasMaxLength(36);
            builder.Entity<Usuario>().Property(u => u.NormalizedUserName).HasMaxLength(36);
            builder.Entity<IdentityRole>().Property(u => u.Id).HasMaxLength(36);
            builder.Entity<IdentityRole>().Property(u => u.NormalizedName).HasMaxLength(90);
        }
    }
}