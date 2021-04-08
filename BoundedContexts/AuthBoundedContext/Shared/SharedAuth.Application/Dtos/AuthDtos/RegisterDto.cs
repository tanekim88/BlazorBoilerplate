

using System.ComponentModel.DataAnnotations;



namespace SharedAuth.Application.Dtos.AuthDtos
{
    public class RegisterDto
    {
        [Required] [EmailAddress] public string Email { get; set; }

        [Required]
        [DataType(dataType: DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(dataType: DataType.Password)]
        public string ConfirmPassword { get; set; }

        public string? ReturnUrl { get; set; }
    }
}