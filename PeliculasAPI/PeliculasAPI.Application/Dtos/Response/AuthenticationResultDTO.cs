using System;

namespace PeliculasAPI.Application.Dtos.Response
{
    public class AuthenticationResultDTO
    {
        public string Token { get; set; }
        public DateTime ExpirationDate  { get; set; }

    }
}
