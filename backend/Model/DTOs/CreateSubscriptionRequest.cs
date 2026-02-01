using GymBae.Model.Enums;
using System.ComponentModel.DataAnnotations;

namespace GymBae.Model.DTOs
{
    /// <summary>
    /// Mock subscribe request. No payment. Tier only.
    /// </summary>
    public class CreateSubscriptionRequest
    {
        [Required]
        public SubscriptionTier Tier { get; set; }
    }
}
