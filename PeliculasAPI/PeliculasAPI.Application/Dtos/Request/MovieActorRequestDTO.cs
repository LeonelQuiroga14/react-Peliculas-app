using System.Text.Json.Serialization;

namespace PeliculasAPI.Application.Dtos.Request
{
    public class MovieActorRequestDTO
    {
        [JsonPropertyName("id")]

        public int Id { get; set; }
        [JsonPropertyName("character")]
        public string Character { get; set;}
        public string Photo { get; set; }
        public string Name { get; set; }
    }
}
