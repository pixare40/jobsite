using Core.Common.Contracts;
using JobMtaani.Business.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace JobMtaani.Data
{
    public class JobMtaaniDbContext : IdentityDbContext<Account>
    {
        public JobMtaaniDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<Ad> AdSet { get; set; }
        public DbSet<Category> CategorySet { get; set; }
        public DbSet<Review> ReviewSet { get; set; }
        public DbSet<Payment> PaymentSet { get; set; }
        public DbSet<AdApplication> AdApplicationSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);

            modelBuilder.Ignore<PropertyChangedEventHandler>();
            modelBuilder.Ignore<ExtensionDataObject>();
            modelBuilder.Ignore<IIdentifiableEntity>();

            modelBuilder.Entity<Account>()
            .ToTable("AspNetUsers");
            modelBuilder.Entity<Ad>().HasKey<int>(e => e.AdId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Category>().HasKey<int>(e => e.CategoryId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Review>().HasKey<int>(e => e.ReviewId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Payment>().HasKey<int>(e => e.PaymentId).Ignore(e => e.EntityId);
            modelBuilder.Entity<AdApplication>().HasKey<int>(e => e.AdApplicationId).Ignore(e => e.EntityId);
        }

        public static JobMtaaniDbContext Create()
        {
            return new JobMtaaniDbContext();
        }

    }
}
