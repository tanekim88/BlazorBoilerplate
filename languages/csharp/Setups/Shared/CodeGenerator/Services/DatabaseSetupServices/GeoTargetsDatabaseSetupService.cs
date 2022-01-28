

using Core.Infrastructure.DbContexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.IO;



namespace CodeGenerator.Services.DatabaseSetupServices
{
    public class GeoTargetsDatabaseSetupService
    {
        private readonly IWebHostEnvironment _env;

        public GeoTargetsDatabaseSetupService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public void EnsureSeedData()
        {

            //using var context = _contextFactory.CreateDbContext();

            //var geoTargetsDir = Path.Combine(path1: _env.ContentRootPath, path2: @"$Seeds\Data\GeoTargets");

            //var geoTargetCsv = Path.Combine(path1: geoTargetsDir, path2: "geotargets-2020-08-05.csv");
            //using (var reader = new StreamReader(path: geoTargetCsv))
            //{
            //    string line;
            //    while ((line = reader.ReadLine()) != null)
            //    {
            //        var splitted = line.Split(separator: ',');
            //    }
            //}
        }
    }
}