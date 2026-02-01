using GymBae.Model.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GymBae.Model
{
    /// <summary>
    /// Mock subscription entity. No real payment integration.
    /// </summary>
    public class Subscription
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; } = null!;

        [Required]
        public SubscriptionTier Tier { get; set; }
        [Required]
        public SubscriptionStatus Status { get; set; } = SubscriptionStatus.Active;

        public DateTime? StartDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
