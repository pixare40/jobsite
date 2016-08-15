namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class approxwage : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Ad", "ApproximateWage", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Ad", "ApproximateWage");
        }
    }
}
