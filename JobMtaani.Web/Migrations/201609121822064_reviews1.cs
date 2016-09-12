namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class reviews1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Review", "DateCreated", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Review", "DateCreated");
        }
    }
}
