namespace PeliculasAPI.Domain.Models
{
    public  class MovieGender
    {
      //  public int Id { get; set; }
        public int MovieId { get; set; }
        public int GenderId { get; set; }

        public Movie Movie { get; set; }
        public Gender Gender { get; set; }
    }
}
