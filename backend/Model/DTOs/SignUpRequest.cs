using System.ComponentModel.DataAnnotations;

namespace GymBae.Model.DTOs
{
    public class SignUpRequest
    {
        public string Name { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; }
    }
}
