namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class reviews : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "NumberOfReviews", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "CurrentRating", c => c.Int(nullable: false));
            AlterColumn("dbo.Review", "ReviewFor", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Review", "ReviewFor", c => c.Int(nullable: false));
            DropColumn("dbo.AspNetUsers", "CurrentRating");
            DropColumn("dbo.AspNetUsers", "NumberOfReviews");
        }
    }
}
