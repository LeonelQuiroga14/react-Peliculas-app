using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using NetTopologySuite.Geometries;
using PeliculasAPI.Application.Interfaces.Services;
using PeliculasAPI.Application.Interfaces.Services.Cloud;
using PeliculasAPI.Services;
using PeliculasAPI.Services.Cloud;
using PeliculasAPI.Shared.Mappings;

namespace PeliculasAPI.Shared.Extensions
{
    public  static class ConfigureServicesContainer
    {

        public static void AddAutomapperConfiguration(this IServiceCollection services) 
        {
            services.AddSingleton(provider =>
            
                new MapperConfiguration(cf =>
                {
                    var geometryFactory = provider.GetRequiredService<GeometryFactory>();
                    cf.AddProfile(new GenderProfile());
                    cf.AddProfile(new ActorProfile());
                    cf.AddProfile(new CinemaProfile());
                    cf.AddProfile(new MovieProfile());
                    cf.AddProfile(new UserProfile());
                    cf.AddProfile(new CinemaProfile(geometryFactory));
                }).CreateMapper());

        }


        public static void AddScopedServices(this IServiceCollection services)
        {
           // serviceCollection.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());


        }
        public static void AddTransientServices(this IServiceCollection services)
        {
            services.AddTransient<IAzureStorageManager, AzureStorageManager>();
            services.AddTransient<IFileManager, FileManager>();

            //serviceCollection.AddTransient<IDateTimeService, DateTimeService>();
            //serviceCollection.AddTransient<IAccountService, AccountService>();
        }
    }
}
