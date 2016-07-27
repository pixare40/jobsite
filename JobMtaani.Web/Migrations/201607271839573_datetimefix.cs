namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class datetimefix : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AspNetUsers", "SubscriptionExpiry", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AspNetUsers", "SubscriptionExpiry", c => c.DateTime(nullable: false));
        }
    }
}
