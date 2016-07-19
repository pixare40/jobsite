namespace JobMtaani.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Categoryname : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Ad", "CategoryName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Ad", "CategoryName");
        }
    }
}
