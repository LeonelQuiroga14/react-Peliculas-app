using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace PeliculasAPI.Application.Interfaces.Services.Cloud
{
    public interface IAzureStorageManager
    {
        Task DeleteFile(string container, string path);
        Task<string> SaveFile(string container, IFormFile file);
        Task<string> UpdateFile(string container, IFormFile file, string path);
    }
}
