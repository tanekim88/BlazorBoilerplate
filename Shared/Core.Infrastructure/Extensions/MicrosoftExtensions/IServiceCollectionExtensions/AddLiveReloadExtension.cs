

//using System;
//using Microsoft.Extensions.DependencyInjection;


//namespace Core.Infrastructure.Extensions.MicrosoftExtensions.IServiceCollectionExtensions
//{
//    public static class AddLiveReloadExtension
//    {
//        public static IServiceCollection AddCustomLiveReload(this IServiceCollection services)
//        {
//            services.AddLiveReload(configAction: config =>
//            {
//                // optional - use config instead
//                //config.LiveReloadEnabled = true;
//                //config.FolderToMonitor = Path.GetFullname(Path.Combine(Env.ContentRootPath,"..")) ;

//                config.FileInclusionFilter = path =>
//                {
//                    if (path.EndsWith(value: ".scss") || path.EndsWith(value: ".txt"))
//                        return FileInclusionModes.DontRefresh;

//                    Console.WriteLine(value: "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
//                    Console.WriteLine(value: path);
//                    // return FileInclusionModes.DontRefresh;
//                    return FileInclusionModes.ContinueProcessing;
//                };
//            });

//            return services;
//        }
//    }
//}