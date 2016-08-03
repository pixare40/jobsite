namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ApplicationStatus : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AdApplication", "Status", c => c.Int(nullable: false));
            AlterColumn("dbo.AdApplication", "DateApplied", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AdApplication", "DateApplied", c => c.DateTime(nullable: false));
            DropColumn("dbo.AdApplication", "Status");
        }
    }
}
