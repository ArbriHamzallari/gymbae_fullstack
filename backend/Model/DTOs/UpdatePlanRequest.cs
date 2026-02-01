using System.ComponentModel.DataAnnotations;

namespace GymBae.Model.DTOs
{
    public class UpdatePlanRequest
    {
        public string? Name { get; set; }
        public string? WorkoutSchedule { get; set; }
        [Range(1, 10000)]
        public int? CalorieGoal { get; set; }
    }
}
