using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Collections.Generic;
using System.Net;

namespace PeliculasAPI.Filters
{
    public class BadRequestParserFilter : IActionFilter
    {
       

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            var resultCast = context.Result as IStatusCodeActionResult;
            
            if (resultCast == null) return;
            
            var statusCode = resultCast.StatusCode;
            if(statusCode == (int) HttpStatusCode.BadRequest)
            {
                var response = new List<string>();
                var currentResult = context.Result as BadRequestObjectResult;
                if(currentResult.Value is string)
                {
                    response.Add(currentResult.Value.ToString());

                } else if (currentResult.Value is IEnumerable<IdentityError> errors)
                {
                    foreach (var error in errors)
                    {
                        response.Add(error.Description);
                    }

                }
                else {
                    foreach (var key in context.ModelState.Keys)
                    {
                        foreach (var error in context.ModelState[key].Errors)
                        {
                            response.Add($"{key}: {error.ErrorMessage}");
                        }
                    }

                }
                context.Result = new BadRequestObjectResult(response);
            }
        }
       
    }
}
