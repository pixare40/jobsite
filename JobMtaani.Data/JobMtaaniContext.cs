using Core.Common.Contracts;
using JobMtaani.Business.Entities;
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
    public class JobMtaaniContext : DbContext
    {
        public JobMtaaniContext()
            : base("JobMtaani")
        {
            Database.SetInitializer<JobMtaaniContext>(null);
        }

        public DbSet<Account> AccountSet { get; set; }
        public DbSet<Ad> AdSet { get; set; }
        public DbSet<Category> CategorySet { get; set; }
        public DbSet<Review> ReviewSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Ignore<PropertyChangedEventHandler>();
            modelBuilder.Ignore<ExtensionDataObject>();
            modelBuilder.Ignore<IIdentifiableEntity>();

            modelBuilder.Entity<Account>().HasKey<int>(e => e.AccountId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Ad>().HasKey<int>(e => e.AdId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Category>().HasKey<int>(e => e.CategoryId).Ignore(e => e.EntityId);
            modelBuilder.Entity<Review>().HasKey<int>(e => e.ReviewId).Ignore(e => e.EntityId);
        }

    }
}
