using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using PeliculasAPI.Application.Interfaces.Services;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PeliculasAPI.Services
{
    public class FileManager : IFileManager
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAcc;

        public FileManager(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _env = env;
            _httpContextAcc = httpContextAccessor;
        }


        public async Task<string> SaveFile(string folder, IFormFile file)
        {
            HttpContext httpContext = _httpContextAcc.HttpContext;
            string extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string newFolder = Path.Combine(_env.WebRootPath, folder);


            if (!Directory.Exists(newFolder))
                Directory.CreateDirectory(newFolder);

            string newPath = Path.Combine(newFolder, fileName);
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var content = memoryStream.ToArray();
                await File.WriteAllBytesAsync(newPath, content);
            }

            string currentUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host}"; ;
            string dbPath = Path.Combine(currentUrl, folder, fileName);
            return dbPath;

        }

        public async Task<string> UpdateFile(string folder, string path, IFormFile file)
        {
            await DeleteFile(path, folder);

            return await SaveFile(folder, file);

        }
        public Task DeleteFile(string path, string folder)
        {
            if (string.IsNullOrEmpty(path))
                return Task.CompletedTask;

            var fileName = Path.GetFileName(path);
            var directoryFile = Path.Combine(_env.WebRootPath, folder, fileName);
            if (File.Exists(directoryFile))
                File.Delete(directoryFile);


            return Task.CompletedTask;
        }

    }
}
