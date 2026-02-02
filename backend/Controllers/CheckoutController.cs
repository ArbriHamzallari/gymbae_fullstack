using GymBae.Model.DTOs;
using GymBae.Model.Enums;
using Microsoft.AspNetCore.Mvc;

namespace GymBae.Controllers
{
    [ApiController]
    [Route("api/checkout")]
    public class CheckoutController : ControllerBase
    {
        private static readonly List<CheckoutPlanDto> Plans = new()
        {
            new CheckoutPlanDto
            {
                Tier = SubscriptionTier.Free,
                Name = "Free",
                Price = "$0",
                BillingInterval = "Month",
                Features = new List<string>
                {
                    "Basic workout tracking",
                    "Daily progress log",
                    "Access to limited workout routines",
                    "Sync with mobile and smartwatch",
                }
            },
            new CheckoutPlanDto
            {
                Tier = SubscriptionTier.Pro,
                Name = "Pro",
                Price = "$9.99",
                BillingInterval = "Month",
                Features = new List<string>
                {
                    "Everything in Free, plus:",
                    "AI-powered workout & meal recommendations",
                    "Custom goal-based programs",
                    "Priority support",
                    "Unlock all workout libraries",
                }
            },
            new CheckoutPlanDto
            {
                Tier = SubscriptionTier.Elite,
                Name = "Elite",
                Price = "$19.99",
                BillingInterval = "Month",
                Features = new List<string>
                {
                    "Everything in Pro, plus:",
                    "1-on-1 coaching feedback",
                    "Full nutrition planning with macros",
                    "Early access to new features",
                }
            }
        };

        [HttpGet("plans")]
        public IActionResult GetPlans()
        {
            return Ok(Plans);
        }

        [HttpGet("plans/{tierName}")]
        public IActionResult GetPlanByTier(string tierName)
        {
            var normalized = tierName?.Trim();
            if (string.IsNullOrEmpty(normalized)) return BadRequest("Tier name required.");

            var tier = normalized.ToLowerInvariant() switch
            {
                "free" => SubscriptionTier.Free,
                "pro" => SubscriptionTier.Pro,
                "elite" => SubscriptionTier.Elite,
                _ => (SubscriptionTier?)null
            };

            if (tier == null) return NotFound("Plan not found.");

            var plan = Plans.FirstOrDefault(p => p.Tier == tier.Value);
            if (plan == null) return NotFound("Plan not found.");

            return Ok(plan);
        }
    }
}
