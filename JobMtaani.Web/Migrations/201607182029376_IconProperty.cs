namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IconProperty : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Ad", "IconClass", c => c.String());
            AddColumn("dbo.Category", "IconClass", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Category", "IconClass");
            DropColumn("dbo.Ad", "IconClass");
        }
    }
}
