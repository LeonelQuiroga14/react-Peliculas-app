using Microsoft.AspNetCore.Identity;

namespace PeliculasAPI.Domain.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
        public string UserId { get; set; }
        public virtual IdentityUser User { get; set; }

    }
}
