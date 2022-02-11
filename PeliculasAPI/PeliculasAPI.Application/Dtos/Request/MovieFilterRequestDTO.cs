using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliculasAPI.Application.Dtos.Request
{
    public class MovieFilterRequestDTO
    {
        public int Page { get; set; }
        public int RecordPerPage{ get; set; }
        public PagingDTO Paging
        {
            get
            {
                return new PagingDTO { Page = Page, RecordsPerPage = RecordPerPage };
            }
        }
        public string Title { get; set; }
        public int GenderId { get; set; }

        public bool InCinema { get; set; }
        public bool NextReleases { get; set; }

    }
}
