using GymBae.Model.Enums;
using System.ComponentModel.DataAnnotations;

namespace GymBae.Model
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        [Required]
        public string FullName { get; set; } = null!;
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

        public bool CompletedOnboarding { get; set; } = false;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
