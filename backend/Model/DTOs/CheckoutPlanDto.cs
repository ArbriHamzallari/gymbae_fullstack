using GymBae.Model.Enums;

namespace GymBae.Model.DTOs
{
    /// <summary>
    /// Plan summary for checkout display. Demo only, no real payment.
    /// </summary>
    public class CheckoutPlanDto
    {
        public SubscriptionTier Tier { get; set; }
        public string Name { get; set; } = "";
        public string Price { get; set; } = "";
        public string BillingInterval { get; set; } = "Month";
        public List<string> Features { get; set; } = new();
    }
}
