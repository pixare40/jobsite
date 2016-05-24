﻿using Core.Common.Core;
using JobMtaani.Business.Bootstrapper;
using JobMtaani.Business.Managers;
using System;
using System.Security.Principal;
using System.Threading;
using SM = System.ServiceModel;

namespace JobMtaani.ServiceHost
{
    class Program
    {
        static void Main(string[] args)
        {
            GenericPrincipal principal = new GenericPrincipal(
                new GenericIdentity("Kabaji"), new string[] { "CarRentalAdmin" });
            Thread.CurrentPrincipal = principal;

            Console.WriteLine("Starting up services");
            Console.WriteLine("");

            ObjectBase.Container = MEFLoader.Init();

            SM.ServiceHost hostAdManager = new SM.ServiceHost((typeof(AdManager)));
            SM.ServiceHost hostAccountManager = new SM.ServiceHost((typeof(AccountManager)));

            StartService(hostAdManager, "Ad Manager");
            StartService(hostAccountManager, "Account Manager");

            Console.WriteLine("");
            Console.WriteLine("Press [ ENTER ] to exit");
            Console.ReadLine();
        }

        static void StartService(SM.ServiceHost host, string serviceDescription)
        {
            host.Open();
            Console.WriteLine("Service {0} started.", serviceDescription);

            foreach (var endpoint in host.Description.Endpoints)
            {
                Console.WriteLine(string.Format("Listening on endpoint:"));
                Console.WriteLine(string.Format("Address: {0}", endpoint.Address.Uri.ToString()));
                Console.WriteLine(string.Format("Binding: {0}", endpoint.Binding.Name));
                Console.WriteLine(string.Format("Contract: {0}", endpoint.Contract.ConfigurationName));
            }

            Console.WriteLine();
        }
    }
}
