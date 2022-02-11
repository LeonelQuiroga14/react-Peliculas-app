using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using PeliculasAPI.Application.Interfaces.Services.Cloud;
using PeliculasAPI.Domain.Settings;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PeliculasAPI.Services.Cloud
{
    public class AzureStorageManager : IAzureStorageManager
    {
        private readonly AzureStorageSettings _storage;

        public AzureStorageManager(IConfiguration configuration)
        {
            _storage = configuration.GetSection("AzureStorage").Get<AzureStorageSettings>();
        }


        public async Task<string> SaveFile(string container, IFormFile file)
        {
            var client = new BlobContainerClient(_storage.ConnectionString, container);
            await client.CreateIfNotExistsAsync();
            client.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var blob = client.GetBlobClient(fileName);
            await blob.UploadAsync(file.OpenReadStream());
            return blob.Uri.ToString();
        }

        public async Task DeleteFile(string container, string path)
        {
            if (string.IsNullOrEmpty(path)) return;

            var client = new BlobContainerClient(_storage.ConnectionString, container);
            var fileName = Path.GetFileName(path);
            var blob = client.GetBlobClient(fileName);

            await blob.DeleteIfExistsAsync();
        }

        public async Task<string> UpdateFile(string container, IFormFile file, string path)
        {
            await DeleteFile(container, path);

            return await SaveFile(container, file);


        }
    }
}
