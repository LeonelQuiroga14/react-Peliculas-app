using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Domain.Validations
{
    public class FirsLetterUpperCaseAttribute : ValidationAttribute
    {

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success;
            }

            var fisrtLetter = value.ToString()[0].ToString();
            if (fisrtLetter != fisrtLetter.ToUpper())
                return new ValidationResult("La primer letra debe ser Mayúscula");


            return ValidationResult.Success;
        }
    }
}
