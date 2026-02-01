using GymBae.Model.Enums;

namespace GymBae.Model.DTOs
{
    public class SubscriptionResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public SubscriptionTier Tier { get; set; }
        public string TierName => Tier.ToString();
        public SubscriptionStatus Status { get; set; }
        public string StatusName => Status.ToString();
        public DateTime? StartDate { get; set; }
    }
}
