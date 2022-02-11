using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace PeliculasAPI.Application.Interfaces.Services
{
    public interface IFileManager
    {
        Task DeleteFile(string path, string folder);
        Task<string> SaveFile(string folder, IFormFile file);
        Task<string> UpdateFile(string folder, string path, IFormFile file);
    }
}
