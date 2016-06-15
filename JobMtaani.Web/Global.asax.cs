using JobMtaani.Client.Bootstrapper;
using JobMtaani.Web.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition.Hosting;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace JobMtaani.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            AggregateCatalog catalog = new AggregateCatalog();
            catalog.Catalogs.Add(new AssemblyCatalog(Assembly.GetExecutingAssembly()));
            CompositionContainer container = MEFLoader.Init(catalog.Catalogs);

            DependencyResolver.SetResolver(new MefDependencyResolver(container)); // view controllers
            GlobalConfiguration.Configuration.DependencyResolver = new MefAPIDependencyResolver(container); // web api controllers

            var migrator = new DbMigrator(new Migrations.Configuration());
            migrator.Update();
        }
    }
}
