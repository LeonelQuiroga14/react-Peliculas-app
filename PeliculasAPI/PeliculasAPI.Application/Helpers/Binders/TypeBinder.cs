using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PeliculasAPI.Application.Helpers.Binders
{
    public class TypeBinder<T> : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            string propName = bindingContext.ModelName;
            ValueProviderResult value = bindingContext.ValueProvider.GetValue(propName);
       
            if(value == ValueProviderResult.None) return Task.CompletedTask;

            try
            {
                var deserializeValue = JsonSerializer.Deserialize<T>(value.FirstValue);
                bindingContext.Result = ModelBindingResult.Success(deserializeValue);
            }
            catch 
            {
                bindingContext.ModelState.TryAddModelError(propName, "Invalid  custom cast a value with the class datatype");
              
            }
            return Task.CompletedTask;
        }
    }
}
