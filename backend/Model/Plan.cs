using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GymBae.Model
{
    public class Plan
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; } = null!;

        public string? Name { get; set; }
        /// <summary>Workout schedule (e.g. JSON or plain text).</summary>
        public string? WorkoutSchedule { get; set; }
        /// <summary>Daily calorie goal.</summary>
        public int? CalorieGoal { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
