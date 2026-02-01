using GymBae.Model;
using GymBae.Model.DTOs;
using GymBae.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GymBae.Controllers
{
    [ApiController]
    [Route("api/subscription")]
    [Authorize]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionService _subscriptionService;

        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        /// <summary>GET: api/subscription/me — Mock only, no real payment.</summary>
        [HttpGet("me")]
        public async Task<IActionResult> GetMySubscription()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var sub = await _subscriptionService.GetByUserIdAsync(userId.Value);
            if (sub == null) return NotFound("Subscription not found");

            return Ok(ToResponse(sub));
        }

        /// <summary>POST: api/subscription — Mock subscribe. No payment.</summary>
        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] CreateSubscriptionRequest request)
        {
            if (request == null) return BadRequest();

            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var sub = await _subscriptionService.CreateAsync(userId.Value, request);
            if (sub == null) return BadRequest("Subscription already exists for this user");

            return Ok(ToResponse(sub));
        }

        /// <summary>PUT: api/subscription/me — e.g. change tier or cancel.</summary>
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMySubscription([FromBody] UpdateSubscriptionRequest request)
        {
            if (request == null) return BadRequest();

            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var sub = await _subscriptionService.UpdateAsync(userId.Value, request);
            if (sub == null) return NotFound("Subscription not found");

            return Ok(ToResponse(sub));
        }

        /// <summary>DELETE: api/subscription/me</summary>
        [HttpDelete("me")]
        public async Task<IActionResult> DeleteMySubscription()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var deleted = await _subscriptionService.DeleteAsync(userId.Value);
            if (!deleted) return NotFound("Subscription not found");

            return Ok(new { message = "Subscription deleted successfully" });
        }

        private static SubscriptionResponse ToResponse(Subscription s)
        {
            return new SubscriptionResponse
            {
                Id = s.Id,
                UserId = s.UserId,
                Tier = s.Tier,
                Status = s.Status,
                StartDate = s.StartDate
            };
        }

        private int? GetUserIdFromToken()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(claim)) return null;
            return int.TryParse(claim, out var id) ? id : null;
        }
    }
}
