using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
namespace PeliculasAPI.Helpers.Extensions
{
    public static class HttpContextExtension
    {

        public async static Task AddPaginParametersInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {

            if(httpContext == null) throw new ArgumentNullException(nameof(httpContext));
            double total = await queryable.CountAsync();
            httpContext.Response.Headers.Add("totalRegistros", total.ToString());
        }

        public static string GetCurrentURL (this HttpContext httpContext)
        {

            return $"{httpContext.Request.Scheme}://{httpContext.Request.Host}";
        }
    }
}
