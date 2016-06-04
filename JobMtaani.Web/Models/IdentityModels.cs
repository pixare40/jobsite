using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using JobMtaani.Business.Entities;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.ComponentModel;
using System.Runtime.Serialization;
using Core.Common.Contracts;

namespace JobMtaani.Web.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public decimal AccountBalance { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<Ad> AdSet { get; set; }
        public DbSet<Category> CategorySet { get; set; }
        public DbSet<Review> ReviewSet { get; set; }
        public DbSet<Payment> PaymentSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);

            modelBuilder.Ignore<PropertyChangedEventHandler>();
            modelBuilder.Ignore<ExtensionDataObject>();
            modelBuilder.Ignore<IIdentifiableEntity>();

            modelBuilder.Entity<ApplicationUser>()
            .ToTable("AspNetUsers");
            modelBuilder.Entity<Ad>().HasKey<int>(e => e.AdId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Category>().HasKey<int>(e => e.CategoryId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Review>().HasKey<int>(e => e.ReviewId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Payment>().HasKey<int>(e => e.PaymentId).Ignore(e => e.EntityId);
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}