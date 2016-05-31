using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using JobMtaani.Client.Proxies;
using JobMtaani.Client.Entities;

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

        [TestMethod]
        public void test_creation_of_ad()
        {
            AdClient adclient = new AdClient();
            adclient.Open();

            Ad ad = new Ad() {AccountId = 1, AdLocation = "nairobi", AdDescription = "Looking for a housegirl" };
            Ad returnedad = adclient.CreateAd(ad, "");
            Assert.IsTrue(ad == returnedad);
        }
    }
}
