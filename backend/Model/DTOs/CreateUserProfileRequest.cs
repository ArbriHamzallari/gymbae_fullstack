using GymBae.Model.Enums;
using System.ComponentModel.DataAnnotations;

namespace GymBae.Model.DTOs
{
    public class CreateUserProfileRequest
    {

        [Required]
        public string FullName { get; set; }

        [Required]
        public Goal Goal { get; set; }

        [Required]
        public ExperienceLevel ExperienceLevel { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public decimal HeightCm { get; set; }

        [Required]
        public decimal WeightKg { get; set; }
    }
}
