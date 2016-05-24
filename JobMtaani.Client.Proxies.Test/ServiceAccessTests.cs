using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using JobMtaani.Client.Proxies;

namespace JobMtaani.Client.Proxies.Test
{
    [TestClass]
    public class ServiceAccessTests
    {
        [TestMethod]
        public void test_ad_client_connection()
        {
            AdClient adclient = new AdClient();
            adclient.Open();
        }
    }
}
