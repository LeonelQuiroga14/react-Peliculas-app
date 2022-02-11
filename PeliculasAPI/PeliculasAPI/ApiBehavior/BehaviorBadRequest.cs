using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace PeliculasAPI.ApiBehavior
{
    public static  class BehaviorBadRequest
    {

        public static void Parse(ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = actionContext =>
            {
                var response = new List<string>();
                foreach (var key in actionContext.ModelState.Keys)
                {
                    foreach (var error in actionContext.ModelState[key].Errors)
                    {
                        response.Add($"{key}: {error.ErrorMessage}");
                    }
                }
                return new BadRequestObjectResult(response);
            };

        }
    }
}
