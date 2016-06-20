namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccountUpdates : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "SubscriptionStatus", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "SubscriptionExpiry", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "DateJoined", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "DateJoined");
            DropColumn("dbo.AspNetUsers", "SubscriptionExpiry");
            DropColumn("dbo.AspNetUsers", "SubscriptionStatus");
        }
    }
}
