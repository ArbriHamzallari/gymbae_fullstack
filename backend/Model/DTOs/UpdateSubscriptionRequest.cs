using GymBae.Model.Enums;
using System.ComponentModel.DataAnnotations;

namespace GymBae.Model.DTOs
{
    public class UpdateSubscriptionRequest
    {
        [Required]
        public SubscriptionTier Tier { get; set; }
        [Required]
        public SubscriptionStatus Status { get; set; }
    }
}
