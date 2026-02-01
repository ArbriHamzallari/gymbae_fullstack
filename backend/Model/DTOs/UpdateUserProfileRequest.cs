using GymBae.Model.Enums;
using System.ComponentModel.DataAnnotations;

namespace GymBae.Model.DTOs
{
    public class UpdateUserProfileRequest
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

        public bool CompletedOnboarding { get; set; } = true;
    }
}
