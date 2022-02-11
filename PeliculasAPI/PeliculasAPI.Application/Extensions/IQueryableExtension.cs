using PeliculasAPI.Application.Dtos.Request;
using System.Linq;

namespace PeliculasAPI.Application.Extensions
{
    public static class IQueryableExtension
    {

        public static IQueryable<T> Paging<T>(this IQueryable<T> queryable, PagingDTO paginacion)
        {


            return queryable.Skip((paginacion.Page - 1) * paginacion.RecordsPerPage)
                .Take(paginacion.RecordsPerPage);
        }
    }
}
